import { React, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import './css/sports.css';

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

function Sports () {
    const [games, setGames] = useState(null);
    const dates = [];

    useEffect(() => {
        onValue(ref(database, '/games/'), snapshot => setGames(Object.values(snapshot.val())));
    }, [])

    if (!games) return;

    function sortDates (date1, date2) {
        return Number(date2.replaceAll('-', '')) - Number(date1.replaceAll('-', ''));
    }

    function getDates () {
        games.forEach(game => {
            if (dates.indexOf(game.date) == -1) dates.push(game.date);
        })

        dates.sort((game1, game2) => sortDates(game1, game2))
    }

    function loadGames () {
        return dates.map(date => {
            return (
                <div className="game-date-list">
                    <h3 className="jost-medium">{date}</h3>
                    <ul>{ games.filter(game => game.date == date).map((game, key) => {
                        return (
                            <article className="sports-game" key={ key }>
                                <div className="sports-game-type">
                                    <p className="jost-medium">{game.type}</p>
                                    <div></div>
                                </div>
                                <div className="sports-game-info">
                                    <div className="sports-game-leftside">
                                        <span className="jost-medium sports-game-school">{game.school_one}</span>
                                        <br />
                                        <span className="jost-medium sports-game-school">{game.school_two}</span>
                                    </div>
                                    <div className="sports-game-center">
                                        <span className="jost-medium sports-game-score">{game.score_one}</span>
                                        <br />
                                        <span className="jost-medium sports-game-score">{game.score_two}</span>
                                    </div>
                                    <div className="sports-game-right">
                                        <span className="jost-medium">{game.location} | {game.time} | {game.date}</span>
                                    </div>
                                </div>
                            </article>
                        )
                    })}</ul>
                </div>
            )
        })
    }

    function loadGamesToday () {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        const gamesToday = games.filter(game => game.date == today);

        if (gamesToday.length == 0) return <h2 className="jost-medium">No Games Today</h2>

        return gamesToday.map((game, key) => {
            return (
                <article className="sports-game" key={ key }>
                    <div className="sports-game-type">
                        <p className="jost-medium">{game.type}</p>
                        <div></div>
                    </div>
                    <div className="sports-game-info">
                        <div className="sports-game-leftside">
                            <span className="jost-medium sports-game-school">{game.school_one}</span>
                            <br />
                            <span className="jost-medium sports-game-school">{game.school_two}</span>
                        </div>
                        <div className="sports-game-center">
                            <span className="jost-medium sports-game-score">{game.score_one}</span>
                            <br />
                            <span className="jost-medium sports-game-score">{game.score_two}</span>
                        </div>
                        <div className="sports-game-right">
                            <span className="jost-medium">{game.location} | {game.time} | {game.date}</span>
                        </div>
                    </div>
                </article>
            )
        })
    }

    getDates();

    return (
        <main id="sports-page">
            <section id="games-today">
                <h3 className="jost-bold">Games Today</h3>
                <ul>{ loadGamesToday() }</ul>
            </section>
            <section id="games-by-date">
                <h3 className="jost-bold">Games By Date</h3>
                <ul>{ loadGames() }</ul>
            </section>
        </main>
    );
}

export default Sports;
