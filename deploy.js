// deploy code will go here
const HdWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const { interface, bytecode } = require("./compile");

const provider = new HdWalletProvider(
  "tennis cross exact piece dentist later fit salmon tree bar rib merit",
  "https://rinkeby.infura.io/v3/d10c1d8208ba4806877b7723f8016977"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const INITIAL_STRING = "hi!";

  console.log("Attempting to deploy from account :- ", accounts[0]);

  const inboxContract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("Contract deployed to ", inboxContract.options.address);
  provider.engine.stop();
};

deploy();
