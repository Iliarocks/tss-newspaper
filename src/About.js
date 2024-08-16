import { React, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import FirebaseImg from './FirebaseImg';
import MarkdownView from 'react-showdown';
import './css/about.css';

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

function About () {
    const [text, setText] = useState(null);

    useEffect(() => {
        onValue(ref(database, '/about/text'), snapshot => setText(snapshot.val()));
    }, [])

    if (!text) return;

    return (
        <main id="about-page">
            <div id="about">
                <div id="about-image"><FirebaseImg path="about-image"/></div>
                <div id="about-text" className='jost-regular'>
                    <h2 className="jost-bold">We’re Thornhill Secondary School’s Student-Run Newspaper!</h2>
                    <MarkdownView markdown={text} />
                </div>
            </div>
        </main>
    );
}

export default About;
