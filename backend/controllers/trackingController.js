const Tracking = require('../models/Tracking');
const Batch = require('../models/Batch');
const { calculateTrustScore } = require('../utils/aiEvaluator');

// @desc    Add tracking entry (Scan)
// @route   POST /api/tracking
// @access  Private (Distributor)
exports.addTrackingEntry = async (req, res) => {
    try {
        const { batchId, location, temperature, humidity, statusUpdate } = req.body;

        const batch = await Batch.findOne({ batchId });

        if (!batch) {
            return res.status(404).json({ success: false, error: 'Batch not found' });
        }

        const tracking = await Tracking.create({
            batch: batch._id,
            scannedBy: req.user.id,
            location: {
                type: 'Point',
                coordinates: [0, 0],
                description: location
            },
            environmentalData: {
                temperature,
                humidity
            },
            statusUpdate
        });

        // Update Batch status and recalculate Trust Score
        batch.status = statusUpdate || batch.status;
        
        const history = await Tracking.find({ batch: batch._id });
        batch.trustScore = calculateTrustScore(batch, history);
        
        await batch.save();

        res.status(201).json({
            success: true,
            data: tracking,
            newTrustScore: batch.trustScore
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};
