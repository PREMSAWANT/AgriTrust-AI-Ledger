const Batch = require('../models/Batch');
const Tracking = require('../models/Tracking');
const { calculateTrustScore } = require('../utils/aiEvaluator');
const { anchorBatchOnChain } = require('../utils/blockchain');
const { uploadToIPFS } = require('../utils/ipfs');

// @desc    Create new batch
// @route   POST /api/batches
// @access  Private (Farmer)
exports.createBatch = async (req, res) => {
    try {
        const { productName, location, harvestDate } = req.body;
        let ipfsHash = '';

        if (req.file) {
            const ipfsResult = await uploadToIPFS(req.file.buffer);
            if (ipfsResult) ipfsHash = ipfsResult.cid;
        }

        const batchId = `AGRI-${Date.now()}`;
        
        // Calculate initial trust score
        const trustScore = calculateTrustScore({ productName, location, harvestDate }, []);

        // Anchor on Blockchain (Simulated or Real depending on env)
        const blockchainTxHash = await anchorBatchOnChain(batchId, JSON.stringify({ productName, harvestDate }));

        const batch = await Batch.create({
            batchId,
            farmer: req.user.id,
            productName,
            harvestDate,
            location: {
                type: 'Point',
                coordinates: [0, 0],
                farmName: location
            },
            trustScore,
            blockchainTxHash,
            ipfsHash,
            status: 'Harvested'
        });

        res.status(201).json({
            success: true,
            data: batch
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Get all batches
// @route   GET /api/batches
// @access  Private
exports.getBatches = async (req, res) => {
    try {
        const batches = await Batch.find().populate('farmer', 'name email');
        res.status(200).json({
            success: true,
            count: batches.length,
            data: batches
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Get single batch by ID
// @route   GET /api/batches/:id
// @access  Public
exports.getBatch = async (req, res) => {
    try {
        const batch = await Batch.findOne({ batchId: req.params.id }).populate('farmer', 'name email');

        if (!batch) {
            return res.status(404).json({ success: false, error: 'Batch not found' });
        }

        const history = await Tracking.find({ batch: batch._id })
            .populate('scannedBy', 'name role')
            .sort('-timestamp');

        res.status(200).json({
            success: true,
            data: {
                ...batch._doc,
                history
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};
// @desc    Add tracking update to batch
// @route   POST /api/batches/track
// @access  Private
exports.addTracking = async (req, res) => {
    try {
        const { batchId, statusUpdate, location, environmentalData } = req.body;

        const batch = await Batch.findOne({ batchId });
        if (!batch) {
            return res.status(404).json({ success: false, error: 'Batch not found' });
        }

        // Calculate new trust score based on update
        const currentHistory = await Tracking.find({ batch: batch._id });
        const newTrustScore = calculateTrustScore(batch, [...currentHistory, { statusUpdate, environmentalData }]);

        const tracking = await Tracking.create({
            batch: batch._id,
            scannedBy: req.user.id,
            location: {
                description: location?.description || 'Transit Point',
                type: 'Point',
                coordinates: [0, 0]
            },
            statusUpdate,
            environmentalData,
            trustScoreEffect: newTrustScore - batch.trustScore
        });

        // Update batch status and trust score
        batch.status = statusUpdate;
        batch.trustScore = newTrustScore;
        await batch.save();

        res.status(200).json({
            success: true,
            data: tracking
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};
