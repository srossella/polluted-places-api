const express = require('express');
const router = express.Router();
const { getPlaces,
  createPlace,
  deletePlace,
  updatePlace,
  getPlaceById } = require( '../controllers/places');

const { imageUpload } = require('../config/multerConfig.js');

router.get('/places', getPlaces)

router.get('/places/:id', getPlaceById)

router.post('/places',imageUpload.single('image'), createPlace)

router.put('/places/:id', imageUpload.single('image'), updatePlace)

router.delete('/places/:id', deletePlace)

module.exports = { router }; 