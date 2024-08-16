import { React, useState } from 'react';
import './css/navbar.css';

function NavBar() {
    const [navbarVisibility, setNavbarVisibility] = useState(window.innerWidth < 1000 ? false : true);

    function handleClick() {
        setNavbarVisibility(!navbarVisibility);
    }

    return (
        <nav id="navigation">
            <header id="nav-desktop-heading" className="nav-heading">
                <a href="/" className="nav-link"><h1 className="jost-bold" id="nav-desktop-logo">EYE OF THE TIGER</h1></a>
            </header>
            <header id="nav-mobile-heading" className="nav-heading">
                <a href="/" className="nav-link"><h1 className="jost-bold" id="nav-mobile-logo">EYE OF THE TIGER</h1></a>
                <span onClick={ handleClick } className="material-symbols-outlined">menu</span>
            </header>
            <ul id="nav-list" style={{display: navbarVisibility ? 'flex' : 'none'}}>
                <a href="/articles" className="nav-list-item nav-link jost-medium">Articles</a>
                <a href="/tigertalks" className="nav-list-item nav-link jost-medium">Tiger Talks</a>
                {/* <a href="/events" className="nav-list-item nav-link jost-medium">Events</a> */}
                <a href="/sports" className="nav-list-item nav-link jost-medium">Sports</a>
                <a href="/announcements" className="nav-list-item nav-link jost-medium">Announcements</a>
                <a href="/about" className="nav-list-item nav-link jost-medium">About</a>
                <a href="https://www.instagram.com/tss_eott/" className="nav-list-item nav-link"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg></a>
            </ul>
        </nav>
    );
}

export default NavBar;