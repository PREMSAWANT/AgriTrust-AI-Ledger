const mongoose = require('mongoose');
const User = require('./models/User');
const Batch = require('./models/Batch');
require('dotenv').config();

const seedForRajesh = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB...');

        const rajesh = await User.findOne({ name: 'Rajesh Kumar' });
        if (!rajesh) {
            console.log('User Rajesh Kumar not found. Please register him first.');
            process.exit(1);
        }

        // Clean existing batches for this user to avoid duplicates if needed
        // await Batch.deleteMany({ farmer: rajesh._id });

        const batches = [
            {
                batchId: 'AGRI-RAJ-001',
                productName: 'Alphonso Mangoes',
                farmer: rajesh._id,
                location: { 
                    farmName: 'Sunshine Orchards', 
                    description: 'Ratnagiri, Maharashtra' 
                },
                harvestDate: new Date('2026-04-20'),
                trustScore: 98.5,
                status: 'In-Transit',
                blockchainTxHash: '0x7d9f2a4b1c8e5d3f0a6b4c2d8e1f0a9b3c5d7e1f'
            },
            {
                batchId: 'AGRI-RAJ-002',
                productName: 'Basmati Rice (Premium)',
                farmer: rajesh._id,
                location: { 
                    farmName: 'Ganga Valley Farm', 
                    description: 'Ludhiana, Punjab' 
                },
                harvestDate: new Date('2026-04-22'),
                trustScore: 100,
                status: 'Harvested',
                blockchainTxHash: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t'
            },
            {
                batchId: 'AGRI-RAJ-003',
                productName: 'Organic Turmeric',
                farmer: rajesh._id,
                location: { 
                    farmName: 'Sunshine Orchards', 
                    description: 'Sangli, Maharashtra' 
                },
                harvestDate: new Date('2026-04-24'),
                trustScore: 97.2,
                status: 'Harvested',
                blockchainTxHash: '0x9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j2i1h0g'
            }
        ];

        await Batch.insertMany(batches);
        console.log(`Successfully seeded ${batches.length} batches for Rajesh Kumar!`);
        process.exit(0);
    } catch (err) {
        console.error('Error seeding:', err);
        process.exit(1);
    }
};

seedForRajesh();
