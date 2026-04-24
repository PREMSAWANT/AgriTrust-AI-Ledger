/**
 * AI Trust Score Evaluator (Simulated)
 * In a real scenario, this would use a machine learning model to analyze 
 * data consistency, sensor trends, and historical behavior.
 */

const calculateTrustScore = (batchData, trackingHistory) => {
    let score = 70; // Base score

    // 1. Completeness of Harvest Data
    if (batchData.productName && batchData.location && batchData.harvestDate) {
        score += 10;
    }

    // 2. Environmental Consistency (Simulated)
    // Check if sensor readings are within safe bounds for the product type
    if (trackingHistory && trackingHistory.length > 0) {
        let sensorViolations = 0;
        trackingHistory.forEach(entry => {
            if (entry.environmentalData) {
                // Example: Temperature should be between 2-8°C for cold chain
                if (entry.environmentalData.temperature > 10 || entry.environmentalData.temperature < 0) {
                    sensorViolations++;
                }
            }
        });

        if (sensorViolations === 0) {
            score += 10;
        } else {
            score -= (sensorViolations * 5);
        }
    } else {
        // No tracking data yet, neutral impact or slight boost for initialization
        score += 5;
    }

    // 3. User Reputation (Simulated)
    // In real app, fetch from User model. Here we assume positive for demo.
    score += 5;

    // Cap score between 0 and 100
    return Math.min(100, Math.max(0, score));
};

module.exports = { calculateTrustScore };
