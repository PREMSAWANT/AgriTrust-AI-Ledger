const mongoose = require('mongoose');

const TrackingSchema = new mongoose.Schema({
    batch: {
        type: mongoose.Schema.ObjectId,
        ref: 'Batch',
        required: true
    },
    scannedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        description: String
    },
    environmentalData: {
        temperature: Number,
        humidity: Number,
        timestamp: {
            type: Date,
            default: Date.now
        }
    },
    statusUpdate: {
        type: String,
        enum: ['In-Transit', 'Delivered', 'Flagged']
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tracking', TrackingSchema);
