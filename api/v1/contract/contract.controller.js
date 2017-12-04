var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var contractAddress = "0x830c75568f71cebdc00ce7f9c3b54508877f54cf";
var contractInfo = require("../../../../smart_contract/build/contracts/Contract.json");
var contractABI = contractInfo["abi"];

var contractObject = web3.eth.contract(contractABI);
var contractInstance = contractObject.at(contractAddress);

var file = require("../file/file.controller");

function addContract(req, res) {
  //var user_addr = req.body.address;
  var date = req.body.date;
  var hash = req.body.hash;
  var name = req.body.name;
  var size = req.body.size;

  if(size) {
    var result = contractInstance.setFile(date, hash, name, size, { from: web3.eth.accounts[0] });

    if(result) {
      res.status(200).json(result);
    }
    else {
      res.status(200).json("No setFile result found");
    }
  }
  else {
    res.status(200).json("No file found");
  }
};

function findContract(req, res) {
  var hash = req.params.hash;
  var data = contractInstance.getFile(hash);
  if(data) {
    res.status(200).json(data);
  }
  else {
    res.status(200).json("No contract data found");
  }
}



module.exports = {
  addContract,
  findContract
}
