import { useContract } from "./useContract";
import nikeGobbleAbi from "../contracts/NikeGobber.json";
import NikeGobblerAddress from "../contracts/CounterAddress.json";

// export interface for smart contract
export const useNikeGobberContract = () =>
  useContract(nikeGobbleAbi, NikeGobblerAddress);
