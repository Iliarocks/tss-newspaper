import { React, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push, onValue } from 'firebase/database';
import TextEditor from './TextEditor';

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

function EventControl () {
    const [events, setEvents] = useState([]);
    const editorReference = {};

    useEffect(() => {
        onValue(ref(database, "/events"), snapshot => snapshot.val() ? setEvents(Object.values(snapshot.val())) : setEvents([]));
    }, [])

    function createEventList () {
        return events.map((event, key) => {
            return (
                <article className="admin-list-item" key={ key }>
                    <p className="nunito-sans-regular">{event.title}</p>
                    <div className="admin-list-item-controls">
                        <button className="admin-button admin-list-button" onClick={ () => deleteEvent(event.id) }>Delete</button>
                    </div>
                </article>
            )
        })
    }

    function postEvent (e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());

        formJson.description = editorReference.editorValue;

        const key = push(ref(database, "/events"), formJson).key;
        set(ref(database, `/events/${key}/id`), key);
    }

    function deleteEvent (id) {
        set(ref(database, `/events/${id}`), null);
    }

    return (
        <>
            <a href="/events" className="admin-control-panel-header nunito-sans-black">Events</a>
            <p className="admin-section-description nunito-sans-regular">Current events. Note: only the 4 nearest upcoming events will me visible, and only on the home page.</p>
            <ul className="admin-list">{ createEventList() }</ul>
            <p className="admin-section-description nunito-sans-regular">Event post form: fill out and submit to add event.</p>
            <form onSubmit={ postEvent } className="admin-form">
                <input className="admin-text-input nunito-sans-regular" placeholder="Title" name="title" type="text" required/>
                <input className="admin-text-input nunito-sans-regular" placeholder="Location" name="location" type="text" required/>
                <input className="admin-text-input nunito-sans-regular" name="start_date" type="date" required/>
                <input className="admin-text-input nunito-sans-regular" name="end_date" type="date" required/>
                <TextEditor editorReference={ editorReference }/>
                <button className="admin-button admin-submit-button" type="submit">Post Event</button>
            </form>
        </>
    );
}

export default EventControl;