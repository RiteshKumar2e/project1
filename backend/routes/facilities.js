const express = require('express');
const router = express.Router();
const { getNearbyFacilities } = require('../controllers/facilityController');

// GET /api/facilities/nearby?lat=XX&lng=YY&radius=ZZZZ
router.get('/nearby', getNearbyFacilities);

module.exports = router;
