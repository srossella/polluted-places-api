
const { pool } = require('../db')
const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'openstreetmap'
};
 
const geocoder = NodeGeocoder(options);
 

const getPlaces = (request, response) => {
    pool.query('SELECT * FROM places ', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createPlace = (request, response) => {
    if ( !request.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      response.send({ msg:'Only image files (jpg, jpeg, png) are allowed!'})
    };
  
    const { filename } = request.file || '';
    const filepath = request.file.path || '';
  
    const { street, town, province } = request.body
    let lat=''
    let long=''
    geocoder.geocode(street+' '+town+' '+province)
          .then( res => {
            console.log(res)
            if(res.length > 0){
               lat = res[0].latitude || '';
               long = res[0].longitude || '';
            }
            console.log(lat + ' ' + long);
            return { lat, long }
          })
          .then( coo => {
            pool.query('INSERT INTO places ( lat, long, street, town, province, filename, filepath) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [ coo.lat, coo.long, street, town, province, filename, filepath], (error, results) => {
            if (error) {
              throw error
            } else if (!Array.isArray(results.rows) || results.rows.length < 1) {
                throw error
            }
            response.status(201).send(results.rows[0])      
            }) 
          })
          .catch((err)=> {
            console.log(err);
            response.status(404).send('an error has occured') 
          })
    
   
  
  }

  const getPlaceById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM places WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      if ( results.rows.length == 0) {
        response.status(404).send(`Resource not found`);
      } else{
           response.status(200).json(results.rows)
      }
    })
  }

  const updatePlace = (request, response) => {
    if ( !request.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      response.status(404).send({ msg:'Only image files (jpg, jpeg, png) are allowed!'})
    };
    
    const id = parseInt(request.params.id)
    const { street, town, province } = request.body
    
    const {filename}  = request.file || '';
    const filepath = request.file.path || ''; 
    
    let lat = ''
    let long = ''

    geocoder.geocode(street+' '+town+' '+province)
          .then( res => {
            if(res.length > 0){
              lat = res[0].latitude || '';
              long = res[0].longitude || '';
           }
            console.log(lat+' '+long);
            return { lat, long }
          })
          .then( coo => {
              pool.query(
                'UPDATE places SET street = $1, town = $2, province = $3, lat = $4, long = $5, filename=$6, filepath=$7 WHERE id = $8 RETURNING *',
                [street, town, province, coo.lat, coo.long, filename, filepath, id],
                (error, results) => {
                  if (error) {
                    throw error
                  }
                  if (typeof results.rows == 'undefined') {
                    response.status(404).send(`Resource not found`);
                  } else if (Array.isArray(results.rows) && results.rows.length < 1) {
                    response.status(404).send(`Resource not found`);
                  } else {
                    response.status(200).send(results.rows[0])         	
                  }
                }
              )
          })
          .catch((err)=> {
            console.log(err);
          })
  }

  const deletePlace = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM places WHERE id = $1 RETURNING *', [id], (error, results) => {
      if (error) {        
        throw error
      }
      if (typeof results.rows == 'undefined') {
        response.status(404).send(`Resource not found`);
      } else if (Array.isArray(results.rows) && results.rows.length < 1) {
        response.status(404).send(`Resource not found`);
      } else {
        response.status(200).send(`Place deleted with ID: ${id}`)
      }
    })
  }

  module.exports = {
    getPlaces,
    createPlace,
    deletePlace,
    updatePlace,
    getPlaceById
  }



