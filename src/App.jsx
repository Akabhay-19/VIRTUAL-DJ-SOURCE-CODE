import React, { useRef, useState } from "react";
import "./App.css";

function Deck({ label, url, setUrl, playerRef, volume, setVolume, onPlay, onPause }) {
  return (
    <div className="deck">
      <h3>{label}</h3>
      <input
        type="text"
        placeholder="Paste direct audio URL here"
        value={url}
        onChange={e => setUrl(e.target.value)}
        className="url-input"
      />
      <audio ref={playerRef} src={url} preload="auto" />
      <div className="controls">
        <button onClick={onPlay}>Play</button>
        <button onClick={onPause}>Pause</button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={e => setVolume(parseFloat(e.target.value))}
        />
        <span>Vol: {(volume * 100).toFixed(0)}%</span>
      </div>
    </div>
  );
}

function App() {
  // Deck 1
  const [url1, setUrl1] = useState("");
  const [volume1, setVolume1] = useState(1.0);
  const player1 = useRef(null);

  // Deck 2
  const [url2, setUrl2] = useState("");
  const [volume2, setVolume2] = useState(1.0);
  const player2 = useRef(null);

  // Crossfader
  const [crossfade, setCrossfade] = useState(0.5); // 0 = deck 1 only, 1 = deck 2 only

  // Sync volumes with crossfader
  React.useEffect(() => {
    if (player1.current) player1.current.volume = (1 - crossfade) * volume1;
    if (player2.current) player2.current.volume = crossfade * volume2;
  }, [crossfade, volume1, volume2]);

  return (
    <div className="virtual-dj">
      <h1>Virtual DJ App (Paste Direct Audio Links)</h1>
      <div className="decks">
        <Deck
          label="Deck 1"
          url={url1}
          setUrl={setUrl1}
          playerRef={player1}
          volume={volume1}
          setVolume={setVolume1}
          onPlay={() => player1.current && player1.current.play()}
          onPause={() => player1.current && player1.current.pause()}
        />
        <Deck
          label="Deck 2"
          url={url2}
          setUrl={setUrl2}
          playerRef={player2}
          volume={volume2}
          setVolume={setVolume2}
          onPlay={() => player2.current && player2.current.play()}
          onPause={() => player2.current && player2.current.pause()}
        />
      </div>
      <div className="crossfader">
        <label>Crossfader</label>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={crossfade}
          onChange={e => setCrossfade(parseFloat(e.target.value))}
        />
        <div>
          <span>Deck 1</span>
          <span style={{ margin: "0 1em" }}></span>
          <span>Deck 2</span>
        </div>
      </div>
      <footer>
        <p>
          Paste direct audio URLs (e.g., mp3/ogg). For YouTube/SoundCloud, a backend is needed to extract audio.
        </p>
      </footer>
    </div>
  );
}

export default App;