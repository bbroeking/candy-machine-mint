import "./App.css";
import { useMemo } from "react";

import Home from "./pages/Home";
import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
} from "@solana/wallet-adapter-wallets";

import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { createTheme, ThemeProvider } from "@material-ui/core";
import NFTShopPage from "pages/NFTShop/NFTShopPage";
import WalletPage from "pages/Wallet/WalletPage";
import { ConnectionProvider } from "@drappi/metaplex-js-common";

const treasury = new anchor.web3.PublicKey(
  process.env.REACT_APP_TREASURY_ADDRESS!
);

const config = new anchor.web3.PublicKey(
  process.env.REACT_APP_CANDY_MACHINE_CONFIG!
);

const candyMachineId = new anchor.web3.PublicKey(
  process.env.REACT_APP_CANDY_MACHINE_ID!
);

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const theme = createTheme({
    palette: {
        type: 'dark',
    },
    overrides: {
        MuiButtonBase: {
            root: {
                justifyContent: 'flex-start',
            },
        },
        MuiButton: {
            root: {
                textTransform: undefined,
                padding: '12px 16px',
            },
            startIcon: {
                marginRight: 8,
            },
            endIcon: {
                marginLeft: 8,
            },
        },
    },
});

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [
        getPhantomWallet(),
        getSolflareWallet(),
        getSolletWallet({ network }),
    ],
    []
  );

  return (
      <ThemeProvider theme={theme}>
        <ConnectionProvider>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletDialogProvider>
            <Router>
              <Navbar />
              <Switch>
                <Route path="/" exact>
                  <Home
                    candyMachineId={candyMachineId}
                    config={config}
                    connection={connection}
                    startDate={startDateSeed}
                    treasury={treasury}
                    txTimeout={txTimeout}
                  />
                </Route>
                <Route path="/nftshop">
                  <NFTShopPage></NFTShopPage>
                </Route>
                <Route path="/wallet"> 
                  <WalletPage connection={connection}></WalletPage>
                </Route>

              </Switch>
            </Router>
            </WalletDialogProvider>
          </WalletProvider>
        </ConnectionProvider>
      </ThemeProvider>
  );
};

export default App;
