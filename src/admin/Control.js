import { React, useState, useEffect } from 'react';
import './control.css';
import ArticleControl from './ArticleControl';
import AnnouncementControl from './AnnouncementControl';
import EventControl from './EventControl';
import InterviewControl from './InterviewControl';
import SportControl from './SportControl';
import AboutControl from './AboutControl';

function Control ({ controlType }) {
    const [control, setControl] = useState(controlType);

    function showControl () {
        switch (control) {
            case 'articles':
                return <ArticleControl />;
            case 'announcements':
                return <AnnouncementControl />
            case 'events':
                return <EventControl />;
            case 'tigertalks':
                return <InterviewControl />
            case 'sports':
                return <SportControl />;
            case 'about':
                return <AboutControl />;
            base:
                return;
        }
    }

    return (
        <main id="admin-page">
            <nav id="admin-sidebar">
                <h1 id="admin-logo" className="nunito-sans-black">EYE OF THE TIGER | ADMIN</h1>
                <ul id="admin-nav">
                    <li className="admin-nav-item"><a href="/admin/articles" className="admin-nav-link nunito-sans-regular">Articles</a></li>
                    <li className="admin-nav-item"><a href="/admin/announcements" className="admin-nav-link nunito-sans-regular">Announcements</a></li>
                    <li className="admin-nav-item"><a href="/admin/events" className="admin-nav-link nunito-sans-regular">Events</a></li>
                    <li className="admin-nav-item"><a href="/admin/tigertalks" className="admin-nav-link nunito-sans-regular">Tiger Talks</a></li>
                    <li className="admin-nav-item"><a href="/admin/sports" className="admin-nav-link nunito-sans-regular">Sports</a></li>
                    <li className="admin-nav-item"><a href="/admin/about" className="admin-nav-link nunito-sans-regular">About</a></li>
                </ul>
                <a id="admin-logout" className="nunito-sans-regular">Sign Out</a>
            </nav>
            <section id="admin-control-panel">
                { showControl() }
            </section>
        </main>
    );
}

export default Control;