import { fontSize, padding } from "@mui/system";
import NFTShopItem from "./NFTShopItem";
import './NFTShopPage.css';

const NFTShopPage = () => {
    return (
        <div className="grid-wrapper">
            <div style={{
                marginRight: 50,
                fontSize: 30,
                paddingBottom: 20
            }}>NFT Shop</div>
            <div className="grid">
                <NFTShopItem/>
                <NFTShopItem/>
                <NFTShopItem/>
                <NFTShopItem/>
                <NFTShopItem/>
                <NFTShopItem/>
            </div>
        </div>
    );
};

export default NFTShopPage;