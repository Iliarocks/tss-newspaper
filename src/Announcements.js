import { React, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import MarkdownView from 'react-showdown';
import './css/announcements.css';

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

function Announcements () {
    const [posts, setPosts] = useState(null);
    const dates = [];

    useEffect(() => {
        onValue(ref(database, '/announcements/'), snapshot => setPosts(Object.values(snapshot.val())));
    }, [])

    if (!posts) return;

    function sortDates (date1, date2) {
        return Number(date2.replaceAll('-', '')) - Number(date1.replaceAll('-', ''));
    }

    function getDates () {
        posts.forEach(post => {
            if (dates.indexOf(post.date) == -1) dates.push(post.date);
        })

        dates.sort((game1, game2) => sortDates(game1, game2))
    }

    function loadPosts () {
        return dates.map(date => {
            return (
                <div className="announcement-date-list">
                    <h3 className="jost-medium">{date}</h3>
                    <ul>{ posts.filter(game => game.date == date).map((post, key) => {
                        return (
                            <article className="home-announcement" key={ key }>
                                <p className="jost-medium home-announcement-date">{ post.date }</p>
                                <p className="jost-medium home-announcement-author">{ post.author }</p>
                                <p className="jost-regular home-announcement-message">{ post.message }</p>
                            </article>
                        )
                    })}</ul>
                </div>
            )
        })
    }

    function loadPostsToday () {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        const postsToday = posts.filter(post => post.date == today);

        if (postsToday.length == 0) return <h3 className="jost-medium">No Announcements Today</h3>

        return postsToday.map((post, key) => {
            return (
                <article className="home-announcement" key={ key }>
                    <p className="jost-medium home-announcement-date">{ post.date }</p>
                    <p className="jost-medium home-announcement-author">{ post.author }</p>
                    <p className="jost-regular home-announcement-message">{ post.message }</p>
                </article>
            )
        })
    }

    getDates();

    return (
        <main id="announcements-page">
            <section id="announcements-today">
                <h3 className="jost-bold">Announcements Today</h3>
                <ul>{ loadPostsToday() }</ul>
            </section>
            <section id="announcements-by-date">
                <h3 className="jost-bold">Announcements By Date</h3>
                <ul>{ loadPosts() }</ul>
            </section>
        </main>
    );
}

export default Announcements;
