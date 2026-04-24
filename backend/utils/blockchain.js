const { ethers } = require('ethers');

/**
 * Anchors batch metadata hash to the Ethereum Blockchain
 */
const anchorBatchOnChain = async (batchId, metadataHash) => {
    try {
        // This is a simulation/template. In production, use a secure private key and provider.
        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || 'http://localhost:8545');
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', provider);

        // Contract Address and ABI (AgriTrust.sol)
        const contractAddress = process.env.CONTRACT_ADDRESS;
        const abi = [
            "function createBatch(string _batchId, string _hash) public",
            "function updateStatus(string _batchId, string _status, string _location) public"
        ];

        const contract = new ethers.Contract(contractAddress, abi, wallet);

        // For demo/hackathon purposes, we might just log this if contractAddress is missing
        if (!contractAddress) {
            console.log(`[Blockchain Mock] Anchoring Batch ${batchId} with hash ${metadataHash}`);
            return `0x_mock_tx_hash_${Date.now()}`;
        }

        const tx = await contract.createBatch(batchId, metadataHash);
        await tx.wait();
        
        return tx.hash;
    } catch (error) {
        console.error('Blockchain Anchoring Error:', error.message);
        return null;
    }
};

module.exports = { anchorBatchOnChain };
