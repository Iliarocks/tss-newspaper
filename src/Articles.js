import { React, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import FirebaseImg from './FirebaseImg';
import './css/articles.css';

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

function Articles ({ pageNumber, goToPage }) {
    const ITEMS_PER_PAGE = 6;
    const [articles, setArticles] = useState(null);

    useEffect(() => {
        onValue(ref(database, '/articles/'), snapshot => setArticles(Object.values(snapshot.val())));
    }, [])

    if (!articles) return;

    const articlesByDate = articles.sort((article1, article2) => compareArticlesByDate(article1.date, article2.date));

    function compareArticlesByDate (date1, date2) {
        return Number(date2.replaceAll('-', '')) - Number(date1.replaceAll('-', ''));
    }

    function loadArticles () {
        return articlesByDate.slice(ITEMS_PER_PAGE * (pageNumber - 1), ITEMS_PER_PAGE * pageNumber).map((article, key) => {
            return (
                <article className="articles-article" key={ key } onClick={ () => goToPage(`article/${article.id}`) }>
                    <FirebaseImg name="articles-cover" path={'/article-covers/' + article.id} />
                    <div className="articles-info">
                        <h3 className="jost-bold articles-genre">{ article.genre }</h3>
                        <h2 className="jost-bold articles-title">{ article.title }</h2>
                        <h4 className="jost-regular articles-byline">By { article.author }</h4>
                    </div>
                </article>
            )
        })
    }

    function loadPageNavigation () {
        return (
            <div id="articles-page-navigation">
                {pageNumber != 1  ? <button className="jost-bold" onClick={() => goToPage(`articles/${parseInt(pageNumber) - 1}`)}>Back</button> : null}
                {pageNumber * ITEMS_PER_PAGE < articles.length ? <button className="jost-bold" onClick={() => goToPage(`articles/${parseInt(pageNumber) + 1}`)}>Next</button> : null}
            </div>
        )
    }

    return (
        <main id="articles-page">
            <h3 className="jost-bold">Articles By Date</h3>
            <ul>{ loadArticles() }</ul>
            { loadPageNavigation() }
        </main>
    );
}

export default Articles;
