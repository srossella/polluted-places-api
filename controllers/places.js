
const { pool } = require('../db')

const getPlaces = (request, response) => {
    pool.query('SELECT * FROM places ', (error, results) => {
      if (error) {
          console.log(error)
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createPlace = (request, response) => {
    const { filename } = request.file;
    const filepath = request.file.path;
    const { street, town, province } = request.body
  
    pool.query('INSERT INTO places (street, town, province, filename, filepath) VALUES ($1, $2, $3, $4, $5) RETURNING *', [street, town, province, filename, filepath], (error, results) => {
      if (error) {
        throw error
      } else if (!Array.isArray(results.rows) || results.rows.length < 1) {
          throw error
      }
       response.status(201).send(`Place added with ID: ${results.rows[0].id}`)      
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
    const id = parseInt(request.params.id)
    const { street, town, province } = request.body
  
    pool.query(
      'UPDATE places SET street = $1, town = $2, province = $3 WHERE id = $4 RETURNING *',
      [street, town, province, id],
      (error, results) => {
        if (error) {
          throw error
        }
        if (typeof results.rows == 'undefined') {
          response.status(404).send(`Resource not found`);
        } else if (Array.isArray(results.rows) && results.rows.length < 1) {
          response.status(404).send(`User not found`);
        } else {
           response.status(200).send(`User modified with ID: ${results.rows[0].id}`)         	
        }
      }
    )
  }

  const deletePlace = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM places WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Place deleted with ID: ${id}`)
    })
  }

  module.exports = {
    getPlaces,
    createPlace,
    deletePlace,
    updatePlace,
    getPlaceById
  }



