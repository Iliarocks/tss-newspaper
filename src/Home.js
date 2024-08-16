import { React, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import FirebaseImg from './FirebaseImg';
import MarkdownView from 'react-showdown';
import './css/home.css';

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

function Home({ goToPage }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        onValue(ref(database), snapshot => setData(snapshot.val()));
    }, [])

    if (!data) return;

    function sortDates (date1, date2) {
        return Number(date2.replaceAll('-', '')) - Number(date1.replaceAll('-', ''));
    }

    function loadArticles (articles) {
        return articles.map((article, key) => {
            return (
                <article className="home-article" key={ key } onClick={ () => goToPage(`article/${article.id}`) }>
                    <FirebaseImg name="home-article-cover" path={'article-covers/' + article.id} />
                    <div className="home-article-info">
                        <h3 className="jost-bold home-article-genre">{ article.genre }</h3>
                        <h2 className="jost-bold home-article-title">{ article.title }</h2>
                        <h4 className="jost-regular home-article-byline">By { article.author }</h4>
                    </div>
                </article>
            )
        })
    }

    function getRecentAnnouncements(announcements) {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        const recentPosts = announcements.filter(post => Number(post.date.replaceAll('-', '')) >= Number(today.replaceAll('-', ''))).sort((post1, post2) => sortDates(post1.date, post2.date));

        return recentPosts.slice(-4);
    }

    function loadAnnouncements (announcements) {
        const announcementsShown = getRecentAnnouncements(announcements);

        if (announcementsShown.length == 0) return <h3 className="jost-medium">No Announcements Upcoming</h3>;

        return getRecentAnnouncements(announcements).map((announcement, key) => {
            return (
                <article className="home-announcement" key={ key }>
                    <p className="jost-medium home-announcement-date">{ announcement.date }</p>
                    <p className="jost-medium home-announcement-author">{ announcement.author }</p>
                    <p className="jost-regular home-announcement-message"><MarkdownView markdown={announcement.message} /></p>
                </article>
            )
        })
    }

    function getRecentSports(games) {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        const recentPosts = games.filter(post => Number(post.date.replaceAll('-', '')) >= Number(today.replaceAll('-', ''))).sort((post1, post2) => sortDates(post1.date, post2.date));

        return recentPosts.slice(-4);
    }

    function loadSports (games) {
        let gamesShown = getRecentSports(games);

        if (gamesShown.length == 0) gamesShown = games.sort((post1, post2) => sortDates(post1.date, post2.date)).slice(0, 4);

        return gamesShown.map((game, key) => {
            return (
                <article className="home-game" key={ key }>
                    <div className="home-game-type">
                        <p className="jost-medium">{game.type}</p>
                        <div></div>
                    </div>
                    <div className="home-game-info">
                        <div className="home-game-leftside">
                            <span className="jost-medium home-game-school">{game.school_one}</span>
                            <br />
                            <span className="jost-medium home-game-school">{game.school_two}</span>
                        </div>
                        <div className="home-game-center">
                            <span className="jost-medium home-game-score">{game.score_one}</span>
                            <br />
                            <span className="jost-medium home-game-score">{game.score_two}</span>
                        </div>
                        <div className="home-game-right">
                            <span className="jost-medium">{game.location} | {game.time} | {game.date}</span>
                        </div>
                    </div>
                </article>
            )
        })
    }

    function getRecentEvents (events) {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        const recentPosts = events.filter(post => Number(post.start_date.replaceAll('-', '')) >= Number(today.replaceAll('-', ''))).sort((post1, post2) => sortDates(post1.start_date, post2.start_date));

        return recentPosts.slice(-4);
    }

    function loadEvents (events) {
        const eventsShown = getRecentEvents(events);

        if (eventsShown.length == 0) return <h3 className="jost-medium">No Events Upcoming</h3>;

        return eventsShown.map((event, key) => {
            return(
                <article className="home-event" key={ key }>
                    <h1 className="jost-bold home-event-title">{event.title}</h1>
                    <p className="jost-medium home-event-date">{event.start_date} to {event.end_date}</p>
                    <p className="jost-medium home-event-location">{event.location}</p>
                </article>
            )
        })
    }

    return (
        <main id="home-page">
            <section className="home-column" id="home-column-one">
                <div id="home-article-section" className="home-section">
                    <h3 className="jost-bold">Featured Articles</h3>
                    <ul>{ loadArticles(Object.values(data.featured_articles).map(featured => data.articles[featured])) }</ul>
                </div>
                {/* <hr /> */}
                <div id="home-announcement-section" className="home-section">
                    <h3 className="jost-bold">Announcements</h3>
                    <ul>{ loadAnnouncements(Object.values(data.announcements)) }</ul>
                </div>
            </section>
            <section className="home-column" id="home-column-two">
                <div id="home-sport-section" className="home-section">
                    <h3 className="jost-bold">Sports</h3>
                    <ul>{ loadSports(Object.values(data.games)) }</ul>
                </div>
                {/* <hr /> */}
                <div id="home-event-section" className="home-section">
                    <h3 className="jost-bold">Events</h3>
                    <ul>{ loadEvents(Object.values(data.events)) }</ul>
                </div>
            </section>
        </main>
    );
}

export default Home;
