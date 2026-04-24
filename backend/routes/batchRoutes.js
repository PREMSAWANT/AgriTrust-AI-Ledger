const express = require('express');
const multer = require('multer');
const { 
    createBatch, 
    getBatches, 
    getBatch,
    addTracking
} = require('../controllers/batchController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Multer config for memory storage
const upload = multer({ storage: multer.memoryStorage() });

router.route('/')
    .get(protect, getBatches)
    .post(protect, authorize('Farmer'), upload.single('image'), createBatch);

router.route('/track')
    .post(protect, addTracking);

router.route('/:id')
    .get(getBatch);

module.exports = router;
