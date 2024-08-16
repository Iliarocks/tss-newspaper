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

function AnnouncementControl () {
    const [posts, setPosts] = useState([]);
    const editorReference = {};

    useEffect(() => {
        onValue(ref(database, "/announcements"), snapshot => snapshot.val() ? setPosts(Object.values(snapshot.val())) : setPosts([]));
    }, [])

    function createPostList () {
        return posts.map((post, key) => {
            return (
                <article className="admin-list-item" key={ key }>
                    <p className="nunito-sans-regular">{post.author} | {post.date}</p>
                    <div className="admin-list-item-controls">
                        <button className="admin-button admin-list-button" onClick={ () => deletePost(post.id) }>Delete</button>
                    </div>
                </article>
            )
        })
    }

    function post (e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());

        // formJson.message = editorReference.editorValue;

        const key = push(ref(database, "/announcements"), formJson).key;
        set(ref(database, `/announcements/${key}/id`), key);
    }

    function deletePost (id) {
        set(ref(database, `/announcements/${id}`), null);
    }

    return (
        <>
            <a href="/announcements" className="admin-control-panel-header nunito-sans-black">Announcements</a>
            <p className="admin-section-description nunito-sans-regular">Current events. Note: only the 4 nearest upcoming events will me visible, and only on the home page.</p>
            <ul className="admin-list">{ createPostList() }</ul>
            <p className="admin-section-description nunito-sans-regular">Event post form: fill out and submit to add event.</p>
            <form onSubmit={ post } className="admin-form">
                <input className="admin-text-input nunito-sans-regular" placeholder="Author" name="author" type="text" required/>
                <input className="admin-text-input nunito-sans-regular" name="date" type="date" required/>
                <textarea name="message">Message</textarea>
                <button className="admin-button admin-submit-button" type="submit">Post Announcement</button>
            </form>
        </>
    );
}

export default AnnouncementControl;