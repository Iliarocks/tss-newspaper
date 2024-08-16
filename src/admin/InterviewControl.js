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

function InterviewControl () {
    const [interviews, setInterviews] = useState([]);

    useEffect(() => {
        onValue(ref(database, "/instagram"), snapshot => snapshot.val() ? setInterviews(Object.values(snapshot.val())) : setInterviews([]));
    }, [])

    function createInterviewList () {
        return interviews.map((interview, key) => {
            return (
                <article className="admin-list-item" key={ key }>
                    <a href={ interview.link } className="nunito-sans-regular">{ interview.link }</a>
                    <div className="admin-list-item-controls">
                        <button className="admin-button admin-list-button" onClick={ () => deleteInterview(interview.id) }>Delete</button>
                    </div>
                </article>
            )
        })
    }

    function postInterview (e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());

        const key = push(ref(database, "/instagram"), formJson).key;

        set(ref(database, `/instagram/${key}/id`), key);
    }

    function deleteInterview (id) {
        set(ref(database, `/instagram/${id}`), null);
    }

    return (
        <>
            <a href="/tigertalks" className="admin-control-panel-header nunito-sans-black">Tiger Talks</a>
            <p className="admin-section-description nunito-sans-regular">Current tiger talks: view or delete.</p>
            <ul className="admin-list">{ createInterviewList() }</ul>
            <p className="admin-section-description nunito-sans-regular">Tiger talk post form: fill out and submit to add tiger talk.</p>
            <form onSubmit={ postInterview } className="admin-form">
                <input className="admin-text-input nunito-sans-regular" placeholder="Link" name="link" type="text" required/>
                <button className="admin-button admin-submit-button" type="submit">Post Tiger Talk</button>
            </form>
        </>
    );
}

export default InterviewControl;