import { NavLink } from "react-router-dom";

function Navbar(){
    return (
    <div className="flex flex-row gap-4  place-content-evenly">
        <NavLink 
      
        to="/"
        >
            Home
        </NavLink>

        <NavLink
        to="/Paste"
        >
            Paste
        </NavLink>
    </div>
    );
}
export default Navbar;