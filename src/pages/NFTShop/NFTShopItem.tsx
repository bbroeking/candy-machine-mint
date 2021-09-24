import image from '../../36.png';
import Button from '@mui/material/Button';
import { width } from '@mui/system';

const NFTShopItem = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            Item Name
            <div
                style={{
                    height: 300,
                    width: 200
                }}
            >
                <img src={image}></img>
            </div>
            <div style={{
                padding: 10,
                display: 'flex',
                width: 80
            }}>
                <span style={{
                    display: 'flex',
                    flexShrink: 0
                }}>Price:</span>
                <div style={{
                    display: 'flex',
                    flex: 1
                }}></div>
                <span style={{
                    display: 'flex',
                    flexShrink: 0
                }}>10</span>
            </div>
            <Button variant="outlined">Purchase</Button>
        </div>
    )
}

export default NFTShopItem
