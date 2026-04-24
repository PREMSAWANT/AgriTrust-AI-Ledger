// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract AgriTrust {
    struct Batch {
        string batchId;
        string productDataHash; // IPFS or Metadata hash
        address farmer;
        uint256 timestamp;
        bool exists;
    }

    struct Tracking {
        address handler;
        string status;
        string location;
        uint256 timestamp;
    }

    mapping(string => Batch) public batches;
    mapping(string => Tracking[]) public batchHistory;

    event BatchCreated(string batchId, address farmer, uint256 timestamp);
    event StatusUpdated(string batchId, address handler, string status, uint256 timestamp);

    function createBatch(string memory _batchId, string memory _hash) public {
        require(!batches[_batchId].exists, "Batch already exists");
        
        batches[_batchId] = Batch({
            batchId: _batchId,
            productDataHash: _hash,
            farmer: msg.sender,
            timestamp: block.timestamp,
            exists: true
        });

        emit BatchCreated(_batchId, msg.sender, block.timestamp);
    }

    function updateStatus(string memory _batchId, string memory _status, string memory _location) public {
        require(batches[_batchId].exists, "Batch does not exist");

        batchHistory[_batchId].push(Tracking({
            handler: msg.sender,
            status: _status,
            location: _location,
            timestamp: block.timestamp
        }));

        emit StatusUpdated(_batchId, msg.sender, _status, block.timestamp);
    }

    function getHistory(string memory _batchId) public view returns (Tracking[] memory) {
        return batchHistory[_batchId];
    }
}
