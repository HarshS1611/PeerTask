import '@/styles/globals.css'
import { AuthProvider,CHAIN  } from "@arcana/auth";
import { ProvideAuth } from "@arcana/auth-react";

const auth = new AuthProvider(`34f13018df2e380560b5784d0eb0079401f0d02c`, {
  position: 'left',
  theme: 'light',
  alwaysVisible: true,
  network: 'testnet', // network can be testnet or mainnet - defaults to testnet
  chainConfig: {
    chainId: CHAIN.POLYGON_MUMBAI_TESTNET,
    rpcUrl: 'https://matic-mumbai.chainstacklabs.com',
  },
})
//const provider = new AuthProvider(`34f13018df2e380560b5784d0eb0079401f0d02c`) // required

export default function App({ Component, pageProps }) {
  return (
    <ProvideAuth provider={auth}>
      <Component {...pageProps} />
    </ProvideAuth>
  )
}
