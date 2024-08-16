import { React, useState } from 'react';
import './App.css';
import Control from './admin/Control';
import NavBar from './NavBar';
import Home from './Home';
import Articles from './Articles';
import Announcements from './Announcements';
import Interviews from './Interviews';
import Sports from './Sports';
import About from './About';
import Article from './Article';

function App() {
  const [path, setPath] = useState(window.location.pathname);

  function goToPage (newPage) {
    window.location.pathname = newPage;
    setPath(newPage);
  }

  function showPage () {
    const paths = path.split('/');
    const primaryPath = paths[1];
    const secondaryPath = paths[2];

    if (primaryPath == 'admin') return <Control controlType={ secondaryPath }/>;

    const nonAdmin = [<NavBar />, <hr className="primary-hr"/>, , <hr className="primary-hr"/>, <footer className="jost-regular">
    <ul id="footer-list">
      <a href="http://www.yrdsb.ca/schools/thornhill.ss/Pages/default.aspx" className="footer-list-item footer-link">Thornhill Secondary School</a>
      <a href="mailto: eyeofthetigerchiefs@gmail.com" className="footer-list-item footer-link">Email Us</a>
    </ul>
    <p id="footer-text">See the code on <a href="https://github.com/Iliarocks/EOTT-newspaper" className="footer-link">GitHub</a></p>
  </footer>];

    switch (primaryPath) {
      case 'articles':
        nonAdmin[2] = <Articles goToPage={ goToPage } pageNumber={ secondaryPath ? secondaryPath : 1 } />;
        break;
      case 'tigertalks':
        nonAdmin[2] = <Interviews goToPage={ goToPage } pageNumber={ secondaryPath ? secondaryPath : 1 } />;
        break;
      case 'announcements':
        nonAdmin[2] = <Announcements />
        break;
      case 'sports':
        nonAdmin[2] = <Sports />
        break;
      case 'about':
        nonAdmin[2] = <About />;
        break;
      case 'article':
        nonAdmin[2] = <Article articleId={secondaryPath} />
        break;
      default:
        nonAdmin[2] = <Home goToPage={ goToPage }/>;
    }

    return nonAdmin;
  }

  return (
    <>
      { showPage() }
    </>
  );
}

export default App;
