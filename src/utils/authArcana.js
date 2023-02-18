import { AuthProvider, CHAIN } from "@arcana/auth";

export const authArcana = new AuthProvider(
  `34f13018df2e380560b5784d0eb0079401f0d02c`,
  {
    position: "right",
    theme: "light",
    alwaysVisible: true,
    network: "testnet", // network can be testnet or mainnet - defaults to testnet
    
  }
);