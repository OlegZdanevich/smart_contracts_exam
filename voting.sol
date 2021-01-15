pragma solidity ^0.4.18;

contract Vote {

    mapping (bytes32 => uint8) public votesReceived;

    bytes32[] public candidateList;

    function Vote(bytes32[] candidateNames) public {
        candidateList = candidateNames;
    }

    function totalVotesFor(bytes32 candidate) public view returns (uint8) {
        return votesReceived[candidate];
    }

    function voteForCandidate(bytes32 candidate) public {
        votesReceived[candidate]++;
    }
}
