import './navbar.css'
import { useEffect, useRef } from 'react';

function Navbar() {
    const menuContainer = useRef()

    const toggleMenu = ()=>{
        if(menuContainer.current && window.innerWidth <= 768){
            if(menuContainer.current.style.display === 'block'){
                menuContainer.current.style.display = 'none'
            } else {
                menuContainer.current.style.display = 'block'
            }
        }
    }

    const handleResize = () => {
        if (window.innerWidth > 768 && menuContainer.current) {
            menuContainer.current.style.display = ''; // Reset
        }
    }

    useEffect(()=>{
        window.addEventListener('resize',handleResize)
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[])

    return ( 
    <>
        <nav className="navbar">
            <div className="nav-brand">
                <img src={require('../../images/cuberx_logo.png')} alt="Rubik's Cube" className="logo"/>
            </div>
            <div className="menu-container" ref={menuContainer}>
                <ul className="nav-links">
                    <li id="account-link" ><a href="#Account">Account</a></li>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#solver">Solver</a></li>
                    <li><a href="#compete">Compete</a></li>
                    <li><a href="#learn">Learn</a></li>
                </ul>
            </div>
            <div className="profile-pic" onClick={toggleMenu}>
                <img src={require('../../images/dummy_profile_pic.png')} alt="Profile"/>
            </div>
        </nav>
    </>
     );
}

export default Navbar;