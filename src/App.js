import './App.css';
import { Fragment, useEffect, useState } from 'react';

export default function App() {
  /// Definition of variables
  const [memeId, setMemeId] = useState('');
  const [textTop, setTextTop] = useState('');
  const [textBottom, setTextBottom] = useState('');
  const [urlImage, setUrlImage] = useState('null');

  const checkChar = memeId.charCodeAt(memeId[0]);

  const urlDisplay = 'https://api.memegen.link/templates/aag';
  const url = 'https://api.memegen.link/images';

  /// Definition of functions
  // GET-request - Display image on page load
  useEffect(() => {
    fetch(urlDisplay)
      .then(function (response) {
        return response.json();
      })

      .then(function (data) {
        setUrlImage(data.blank);
        //       console.log(urlImage);
      })

      .catch(function (error) {
        console.log('Error:', error);
      });
  }, []);

  // POST-request
  function requestData() {
    fetch(
      url,

      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          template_id: memeId,
          text: [textTop, textBottom],
        }),
      },
    )
      .then(function (response) {
        return response.json();
      })

      .then(function (data) {
        setUrlImage(data.url);
        //       console.log(urlImage);
      })

      .catch(function (error) {
        console.log('Error:', error);
      });
  }

  // Evoke POST-request on 'keydown Enter'
  const handleKeyDown = function (event) {
    if (
      (checkChar >= 65 && checkChar <= 90) ||
      (checkChar >= 97 && checkChar <= 122 && event.key === 'Enter')
    ) {
      requestData();
    }
  };

  // Handle download
  function handleDownload() {
    const linkDownload = document.createElement('a');
    linkDownload.href = urlImage;
    linkDownload.setAttribute('download', 'meme-image.jpg');
    document.body.appendChild(linkDownload);
    linkDownload.click();
    linkDownload.parentNode.removeChild(linkDownload);
  }

  return (
    /// Return JSX-elements

    <div className="container">
      <div className="headLine">Meme generator</div>

      <div className="textTop">
        <label htmlFor="textTop">Top text</label>

        <input
          name="textTop"
          value={textTop}
          onChange={(event) => setTextTop(event.currentTarget.value)}
        />
      </div>

      <div className="textBottom">
        <label htmlFor="textBottom">Bottom text</label>

        <input
          name="textBottom"
          value={textBottom}
          onChange={(event) => setTextBottom(event.currentTarget.value)}
        />
      </div>

      <div className="meme">
        <label htmlFor="memeTemplate">Meme template</label>

        <input
          name="memeTemplate"
          value={memeId}
          onChange={(event) => setMemeId(event.currentTarget.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="imageContainer">
        <img src={urlImage} alt="" data-test-id="meme-image" />
      </div>

      <button className="downLoad" onClick={handleDownload}>
        Download
      </button>
    </div>
  );
}
