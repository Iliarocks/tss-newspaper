import { React, useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL} from "firebase/storage";

import { initializeApp } from 'firebase/app';

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
const storage = getStorage(app);

export default function FirebaseImg ({ path, name }) {
    const [URL, setURL] = useState(null);

    useEffect(() => {
        getDownloadURL(ref(storage, path)).then(url => setURL(url));
    }, [path])

    if (!URL) return null;

    return <img className={name} src={URL}/>
}