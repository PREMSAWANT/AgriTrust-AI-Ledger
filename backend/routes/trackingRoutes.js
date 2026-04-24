const express = require('express');
const { addTrackingEntry } = require('../controllers/trackingController');

const { protect, authorize } = require('../middleware/authMiddleware');
const { detectFraud } = require('../middleware/fraudDetection');

const router = express.Router();

router.route('/').post(protect, authorize('Distributor'), detectFraud, addTrackingEntry);

module.exports = router;
