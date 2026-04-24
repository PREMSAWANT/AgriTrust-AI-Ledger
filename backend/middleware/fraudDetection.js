const Tracking = require('../models/Tracking');

/**
 * AI Fraud Detection Middleware
 * Checks for suspicious scanning patterns (e.g., Impossible Travel)
 */
exports.detectFraud = async (req, res, next) => {
    const { batchId, location } = req.body;

    try {
        const lastTracking = await Tracking.findOne({ batchId })
            .sort({ timestamp: -1 })
            .limit(1);

        if (lastTracking) {
            const timeDiff = (Date.now() - new Date(lastTracking.timestamp)) / 1000 / 60; // minutes
            
            // Simulation: If last scan was < 5 mins ago and location changed significantly
            // In real app, use Haversine formula for distance.
            if (timeDiff < 5 && lastTracking.location.description !== location) {
                console.warn(`[Fraud Alert] Batch ${batchId} scanned at ${location} shortly after ${lastTracking.location.description}`);
                // Instead of blocking, we might just flag it or lower the trust score
                req.fraudFlag = true;
            }
        }

        next();
    } catch (err) {
        next();
    }
};
