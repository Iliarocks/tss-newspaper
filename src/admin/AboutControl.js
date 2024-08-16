import { React, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { getStorage, uploadBytesResumable, ref as sRef } from "firebase/storage";
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

function AboutControl () {
    const editorReference = {};

    function updateAboutImage (e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());

        uploadBytesResumable(sRef(storage, '/about-image'), formJson.photo);
    }

    function updateAboutText (e) {
        e.preventDefault();

        set(ref(database, '/about/text'), editorReference.editorValue);
    }

    return (
        <>
            <a href="/about" className="admin-control-panel-header nunito-sans-black">About</a>
            <p className="admin-section-description nunito-sans-regular">Club photo: choose an image that displays the current club executives.</p>
            <form onSubmit={ updateAboutImage } className="admin-form">
                <input id="about-photo-input" name="photo" type="file" accept="image/*" required/>
                <button className="admin-button admin-submit-button" type="submit">Update Image</button>
            </form>
            <p className="admin-section-description nunito-sans-regular">Club description: write primarily about the club activities and optionaly mention the executives and their roles.</p>
            <form onSubmit={ updateAboutText } className="admin-form">
                <TextEditor editorReference={ editorReference }/>
                <button className="admin-button admin-submit-button" type="submit">Update Text</button>
            </form>
        </>
    );
}

export default AboutControl;