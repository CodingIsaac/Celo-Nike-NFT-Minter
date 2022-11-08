import { useContract } from "./useContract";
import MyNFTAbi from "../contracts/NikeGobbler.json";
import MyNFTContractAddress from "../contracts/NikeGobbler-address.json";

export const useMinterContract = () =>
  useContract(MyNFTAbi.abi, MyNFTContractAddress.MyNFT);