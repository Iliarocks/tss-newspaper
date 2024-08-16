import { React, useState, useRef, useMemo } from 'react';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { initializeApp } from 'firebase/app';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

const toolBarOptions = [["bold", "italic", "underline", "strike", "blockquote", "link", "image", "code-block"]];

export default function TextEditor ({ editorReference }) {
    const [value, setValue] = useState('');
    const quill = useRef(); 

    const module = useMemo(() => ({
        toolbar: {
            container: toolBarOptions,
            handlers: {
                image: imageHandler,
            }
        }
    }), [])

    function imageHandler (a) {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
    
        input.onchange = () => {
            const file = input.files[0];
            findImage(file);
        }
    }

    function findImage (file) {
        const reference = ref(storage, "article-images/" + file.name);
        const editor = quill.current.getEditor();
    
        getDownloadURL(reference)
            .then(url => {
                editor.insertEmbed(editor.getSelection(), 'image', url);
            })
            .catch(error => {
                switch (error.code) {
                    case 'storage/object-not-found':
                        uploadBytesResumable(reference, file);
                        findImage(file);
                }
            });
    }

    editorReference.editorValue = value;

    return <ReactQuill ref={quill} modules={module} value={value} onChange={setValue}/>
}