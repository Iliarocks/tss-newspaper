import { React, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref,  onValue } from 'firebase/database';
import FirebaseImg from './FirebaseImg';
import MarkdownView from 'react-showdown';
import './css/article.css';

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

function Article({ articleId }) {
    const [article, setArticle] = useState(null);
    const articleRerference = ref(database, `/articles/${articleId}`);

    useEffect(() => {
        onValue(articleRerference, snapshot => setArticle(snapshot.val()));
    }, [])

    if (!article) return null;

    return (
        <main id="article-page">
            <section id="article-info">
                <h3 className="jost-bold article-genre">{ article.genre }</h3>
                <h2 className="jost-bold article-title">{ article.title }</h2>
                <FirebaseImg name="article-cover" path={'/article-covers/' + article.id} />
                <h4 className="jost-medium article-byline">By { article.author } | { article.date }</h4>
                {/* <h4 className="jost-regular article-date">{ article.date }</h4> */}
            </section>
            <hr />
            <section id="article-text" className="jost-regular">
                <MarkdownView markdown={article.markdown} />
            </section>
        </main>
    );
}

export default Article;
