import { React, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push, onValue } from 'firebase/database';

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

function SportControl () {
    const [games, setGames] = useState([]);

    useEffect(() => {
        onValue(ref(database, "/games"), snapshot => snapshot.val() ? setGames(Object.values(snapshot.val())) : setGames([]));
    }, [])

    function createGameList () {
        return games.map((game, key) => {
            return (
                <article className="admin-list-item" key={ key }>
                    <p className="nunito-sans-regular">{game.school_one} - {game.score_one} | {game.school_two} - {game.score_two}</p>
                    <div className="admin-list-item-controls">
                        <form onSubmit={ e => updateScore(e, game.id) } className="admin-list-item-form">
                            <input className="nunito-sans-regular" placeholder="Score 1" name="score_1" type="text" required/>
                            <input className="nunito-sans-regular" placeholder="Score 2" name="score_2" type="text" required/>
                            <button className="admin-button admin-list-button" type="submit">Update Score</button>
                        </form>
                        <button className="admin-button admin-list-button" onClick={ () => deleteGame(game.id) }>Delete</button>
                    </div>
                </article>
            )
        })
    }

    function updateScore (e, id) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());

        set(ref(database, `/games/${id}/score_one`), formJson.score_1);
        set(ref(database, `/games/${id}/score_two`), formJson.score_2);
    }

    function postGame (e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());

        formJson.score_one = 0;
        formJson.score_two = 0;

        const key = push(ref(database, "/games"), formJson).key;
        set(ref(database, `/games/${key}/id`), key);
    }

    function deleteGame (id) {
        set(ref(database, `/games/${id}`), null);
    }

    return (
        <>
            <a href="/sports" className="admin-control-panel-header nunito-sans-black">Sports</a>
            <p className="admin-section-description nunito-sans-regular">Current tiger talks: view or delete.</p>
            <ul className="admin-list">{ createGameList() }</ul>
            <p className="admin-section-description nunito-sans-regular">Tiger talk post form: fill out and submit to add tiger talk.</p>
            <form className="admin-form" onSubmit={ postGame }>
                <input className="admin-text-input nunito-sans-regular" placeholder="Team One" name="school_one" type="text" required/>
                <input className="admin-text-input nunito-sans-regular" placeholder="Team Two" name="school_two" type="text" required/>
                <input className="admin-text-input nunito-sans-regular" placeholder="Location" name="location" type="text" required/>
                <input className="admin-text-input nunito-sans-regular" placeholder="Sport Type" name="type" type="text" required/>
                <input className="admin-text-input" name="time" type="time" required/>
                <input className="admin-text-input" name="date" type="date" required/>
                <button className="admin-button admin-submit-button" type="submit">Post Game</button>
            </form>
        </>
    );
}

export default SportControl;