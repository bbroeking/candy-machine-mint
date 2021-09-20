import {
    Nav,
    NavLogo,
    NavLink,
    Bars,
    NavMenu,
} from "./NavbarElements";

import { ValidatorWars } from "./ValidatorWars";

const Navbar = () => {
    return (
        <>
           <Nav>
            <NavLogo to="/">
                <ValidatorWars/>
            </NavLogo>
            <Bars />

            <NavMenu>
                <NavLink to="/" activeStyle>
                    Home
                </NavLink>
                <NavLink to="/nftshop" activeStyle>
                    Shop
                </NavLink>
                <NavLink to="/wallet" activeStyle>
                    Wallet
                </NavLink>
            </NavMenu> 
           </Nav> 
        </>
    );
};
export default Navbar;