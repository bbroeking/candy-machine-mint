import {
    Nav,
    NavLogo,
    NavLink,
    NavMenu,
} from "./NavbarElements";
import {
    shortenAddress,
} from "../../candy-machine";

import styled from "styled-components";
import { ValidatorWars } from "./ValidatorWars";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";

const ConnectButton = styled(WalletDialogButton)``;

const Navbar = () => {
    const wallet = useWallet();

    return (
        <>
           <Nav>
                <NavLogo to="/">
                    <ValidatorWars/>
                </NavLogo>

                <NavMenu>
                    <NavLink to="/nftshop" activeClassName="active">Shop</NavLink>
                    <NavLink to="/wallet" activeClassName="active">Wallet</NavLink>
                    <div>
                        {!wallet.publicKey ? (
                            <ConnectButton>Connect Wallet</ConnectButton>
                        ) : (
                            <p>Address: {shortenAddress(wallet.publicKey.toBase58() || "")}</p>
                        )}
                    </div>
                </NavMenu> 
           </Nav> 
        </>
    );
};
export default Navbar;