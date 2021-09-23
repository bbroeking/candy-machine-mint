import { decodeMetadata, getMetadata, Metadata } from "@drappi/metaplex-js-common/dist/lib/actions";
import * as anchor from "@project-serum/anchor";
import { useEffect, useRef } from "react";
import { AnchorWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import WalletItem from "./WalletItem";
import "./WalletPage.css";

export interface WalletProps {
  connection: anchor.web3.Connection;
}

const WalletPage = (props: WalletProps) => {

  const wallet = useAnchorWallet();
  const [tokens, setTokens] = useState<Metadata[]>([]);

  async function parseAccount(metadata: any) {
    const mintInfo = await getMetadata(metadata.parsed.info.mint);
    const nftMetadata  = await props.connection.getAccountInfo(new anchor.web3.PublicKey(mintInfo));
    if (nftMetadata) {
      const decoded = decodeMetadata(nftMetadata.data);
      return decoded;
    }
  }
  const calledOnce = useRef(false);

  useEffect(() => {
      (async () => {

        if (!wallet) return;
        if (calledOnce.current) return;
  
        let metadataNFTs: Metadata[] = [];
        const parsedAccounts = await props.connection.getParsedTokenAccountsByOwner(
          wallet.publicKey,
          { programId: new anchor.web3.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" )}
        );
        const parsedNFTs = parsedAccounts.value;
        for(let i = 0; i < parsedNFTs.length; i++) {
          const parseNFT = parsedNFTs[i].account.data;
          const parsedAccount = await parseAccount(parseNFT);
          if (parsedAccount)
            metadataNFTs.push(parsedAccount);
        }
        setTokens(metadataNFTs);
        calledOnce.current = true;
      })();
  }, [wallet, props.connection, parseAccount]);

  return (
        <div className="wallet">
          <div className="header">
            <p className="wallet-text">Wallet</p>
            <div className="items-text">My Items</div>
          </div>
          <div className="showcase-wrapper">
            <div className="showcase">
              {tokens.map((data, id) => {
                return <WalletItem key={id} metadata={data}/>
              })}
            </div>
          </div>
        </div>
  )
}

export default WalletPage
