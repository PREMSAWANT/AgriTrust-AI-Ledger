const mongoose = require('mongoose');

const BatchSchema = new mongoose.Schema({
    batchId: {
        type: String,
        required: true,
        unique: true
    },
    farmer: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    productName: {
        type: String,
        required: [true, 'Please add a product name']
    },
    harvestDate: {
        type: Date,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            index: '2dsphere',
            default: [0, 0]
        },
        farmName: String,
        description: String
    },
    trustScore: {
        type: Number,
        default: 0
    },
    blockchainTxHash: {
        type: String
    },
    ipfsHash: {
        type: String
    },
    status: {
        type: String,
        enum: ['Harvested', 'In-Transit', 'Delivered', 'Flagged'],
        default: 'Harvested'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Batch', BatchSchema);
