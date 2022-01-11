const express = require('express');
const router = express.Router();
const { getPlaces,
  createPlace,
  deletePlace,
  updatePlace,
  getPlaceById,
  getPlaceByTown } = require( '../controllers/places');
const { imageUpload } = require('../config/multerConfig.js');

router.get('/places', getPlaces)
router.get('/places/town/:town', getPlaceByTown)
router.get('/places/id/:id', getPlaceById)
router.post('/places',imageUpload.single('image'), createPlace)
router.put('/places/:id', imageUpload.single('image'), updatePlace)
router.delete('/places/:id', deletePlace)

module.exports = { router }; 