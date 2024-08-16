import { React, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { InstagramEmbed } from 'react-social-media-embed';
import './css/interviews.css';

const firebaseConfig = {
    apiKey: "AIzaSyCPDfhNgLIQM7G-uf9CdKTDc-XMdq9jPTQ",
    authDomain: "tss-eott.firebaseapp.com",
    databaseURL: "https://tss-eott-default-rtdb.firebaseio.com",
    projectId: "tss-eott",
    storageBucket: "tss-eott.appspot.com",
    messagingSenderId: "703878331671",
    appId: "1:703878331671:web:2b593e5f304bbf604a0b52"
};
  
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function Interviews ({ pageNumber, goToPage }) {
    const ITEMS_PER_PAGE = 6;
    const [interviews, setInterviews] = useState(null);

    useEffect(() => {
        onValue(ref(database, '/instagram'), snapshot => setInterviews(Object.values(snapshot.val())));
    }, [])

    if (!interviews) return;

    function loadInterviews () {
        return interviews.slice(ITEMS_PER_PAGE * (pageNumber - 1), ITEMS_PER_PAGE * pageNumber).map(interview => {
            return <InstagramEmbed url={ interview.link } width="100%" />
        })
    }

    function loadPageNavigation () {
        return (
            <div id="interviews-page-navigation">
                {pageNumber != 1  ? <button className="jost-bold" onClick={() => goToPage(`tigertalks/${parseInt(pageNumber) - 1}`)}>Back</button> : null}
                {pageNumber * ITEMS_PER_PAGE < interviews.length ? <button className="jost-bold" onClick={() => goToPage(`tigertalks/${parseInt(pageNumber) + 1}`)}>Next</button> : null}
            </div>
        )
    }

    return (
        <main id="interviews-page">
            <h3 className="jost-bold">Tiger Talks</h3>
            <ul>{ loadInterviews() }</ul>
            { loadPageNavigation() }
        </main>
    );
}

export default Interviews;
