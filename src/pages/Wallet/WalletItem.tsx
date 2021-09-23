import { Metadata } from "@drappi/metaplex-js-common/dist/lib/actions";
import { useEffect, useState } from "react";
import './WalletItem.css';
import Button from '@mui/material/Button';

export interface WalletProps {
    metadata: Metadata
}

export interface NFTMetadata {
    description: any,
    external_url: any,
    image: any,
    name: any,
    properties: any,
    seller_fee_basis_points: any,
    symbol: any
}

const WalletItem = (props: WalletProps) => {
    const [nft, setNft] = useState<NFTMetadata>();

    useEffect(() => {
        (async () => {
            fetch(props.metadata.data.uri)
                .then(res => res.json())
                .then(json => setNft(json as NFTMetadata));
        })();
    }, [props.metadata]);

    return (
        <div>
            <div className="row">
                <div className="column center">
                    <p>{nft?.name}</p>
                    <div className="image-holder">
                        <img src={nft?.image}/>
                    </div>
                </div>
                <div className="column">
                    <Button variant="outlined">Transfer</Button>
                    <Button variant="outlined">Sell</Button>
                    <Button variant="outlined">Send</Button>
                </div>
            </div>

        </div>
    )
}

export default WalletItem
