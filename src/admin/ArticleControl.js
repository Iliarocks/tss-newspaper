import { React, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push, onValue } from 'firebase/database';
import { getStorage, uploadBytesResumable, ref as sRef, deleteObject } from "firebase/storage";
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
const storage = getStorage(app);

function ArticleControl () {
    const [articles, setArticles] = useState([]);
    const [featured, setFeatured] = useState();
    const editorReference = {};

    useEffect(() => {
        onValue(ref(database, "/articles"), snapshot => snapshot.val() ? setArticles(Object.values(snapshot.val())) : setArticles([]));
        onValue(ref(database, "/featured_articles"), snapshot => snapshot.val() ? setFeatured(Object.values(snapshot.val())) : setFeatured([]));
    }, [])

    function createArticleList () {
        return articles.map((article, key) => {
            return (
                <article className="admin-list-item" key={ key }>
                    <p className="nunito-sans-regular">{article.title} | {article.date}</p>
                    <div className="admin-list-item-controls">
                        <button className="admin-button admin-list-button" onClick={ () => isFeatured(article.id) ? unfeature(article.id) : feature(article.id) }>{ isFeatured(article.id) ? "Unfeature" : "Feature" }</button>
                        <button className="admin-button admin-list-button" onClick={ () => deleteArticle(article.id) }>Delete</button>
                    </div>
                </article>
            )
        })
    }

    function postArticle (e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());

        formJson.markdown = editorReference.editorValue;

        const key = push(ref(database, "/articles"), formJson).key;
        set(ref(database, `/articles/${key}/id`), key);
        uploadBytesResumable(sRef(storage, 'article-covers/' + key), formJson.cover);
    }

    function deleteArticle (id) {
        set(ref(database, `/articles/${id}`), null);
        set(ref(database, "/featured_articles/" + id), null);
    }

    function isFeatured (id) {
        return featured.includes(id);
    }

    function feature (id) {
        set(ref(database, "/featured_articles/" + id), id);
    }

    function unfeature (id) {
        set(ref(database, "/featured_articles/" + id), null);
    }

    return (
        <>
            <a href="/about" className="admin-control-panel-header nunito-sans-black">Articles</a>
            <p className="admin-section-description nunito-sans-regular">Current articles: delete or feature articles.</p>
            <ul className="admin-list">{ createArticleList() }</ul>
            <p className="admin-section-description nunito-sans-regular">Article post form: fill out and submit to add article.</p>
            <form onSubmit={ postArticle } className="admin-form">
                <input className="admin-text-input nunito-sans-regular" placeholder="Title" name="title" type="text" required/>
                <input className="admin-text-input nunito-sans-regular" placeholder="Author" name="author" type="text" required/>
                <input className="admin-text-input nunito-sans-regular" placeholder="Genre" name="genre" type="text" required/>
                <input className="admin-text-input nunito-sans-regular" name="date" type="date" required/>
                <input className="admin-image-input" name="cover" type="file" accept="image/*" required/>
                <TextEditor editorReference={ editorReference }/>
                <button className="admin-button admin-submit-button" type="submit">Post Article</button>
            </form>
        </>
    );
}

export default ArticleControl;