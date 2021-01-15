
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.defaultAccount = web3.eth.accounts[0];

let VotingContract = web3.eth.contract([
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "votesReceived",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "candidate",
                "type": "bytes32"
            }
        ],
        "name": "totalVotesFor",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "candidateList",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "candidate",
                "type": "bytes32"
            }
        ],
        "name": "voteForCandidate",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "candidateNames",
                "type": "bytes32[]"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }
]);
let vote =  VotingContract.at('0x7c997026830be2e310cee40313ae35e7063151f6');

let candidates = {"63byn": "candidate-1", "100byn": "candidate-2", "300byn": "candidate-3"};

function voteForPrice() {
    candidateName = $("#candidate").val();
    vote.voteForCandidate(candidateName, {from: '0x914E1df3750a7aC81139594299fAfE82e6786781'}, function() {
        let div_id = candidates[candidateName];
        $("#" + div_id).html(vote.totalVotesFor.call(candidateName).toString());
    });
}

$(document).ready(function() {
    candidateNames = Object.keys(candidates);
    for (let i = 0; i < candidateNames.length; i++) {
        let name = candidateNames[i];
        let val = vote.totalVotesFor.call(name).toString();
        $("#" + candidates[name]).html(val);
    }
});