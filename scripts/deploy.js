const hre = require("hardhat");

async function main() {
  const MyNFT = await hre.ethers.getContractFactory("NikeGobbler");
  const myNFT = await MyNFT.deploy();

  await myNFT.deployed();

  console.log("MyNFT deployed to:", myNFT.address);
  storeContractData(myNFT);
}

function storeContractData(contract) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/NikeGobbler-address.json",
    JSON.stringify({ MyNFT: contract.address }, undefined, 2)
  );

  const MyNFTArtifact = artifacts.readArtifactSync("NikeGobbler");

  fs.writeFileSync(
    contractsDir + "/NikeGobbler.json",
    JSON.stringify(MyNFTArtifact, null, 2)
  );
}
// MyNFT deployed to: 0xd1F90A67fC23574426f5cC6F839D2AD6e66EcDf6
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });