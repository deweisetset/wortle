'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Dynamically import and initialize the game
    import('@/scripts/wortle-game').then(({ WortleGame, initUIHandlers }) => {
      const game = new WortleGame();
      window.game = game as any;
      initUIHandlers();
    });

    import('@/scripts/login').then(({ initLogin }) => {
      initLogin();
    });
  }, []);

  return (
    <>
      <header>
        <div className="header-content">
          <h1>WORTLE</h1>
          <button className="login-btn" id="loginBtn" title="Login dengan Google">
            <span className="login-text">Login</span>
          </button>
        </div>
      </header>

      <div className="game-container">
        <div className="grid-container" id="grid">
          {[...Array(6)].map((_, rowIdx) => (
            <div key={rowIdx} className="grid-row">
              {[...Array(5)].map((_, cellIdx) => (
                <div key={cellIdx} className="grid-cell"></div>
              ))}
            </div>
          ))}
        </div>

        <div className="grid-actions">
          <div className="player-info" id="playerInfo"></div>
          <button className="info-btn" id="leaderboardBtn" title="Leaderboard">
            <img src="/icon/icon-leaderboard.svg" alt="" aria-hidden="true" />
            <span className="visually-hidden">Leaderboard</span>
          </button>
          <button className="info-btn" id="infoBtn" title="Info">
            <img src="/icon/icon-info.svg" alt="" aria-hidden="true" />
            <span className="visually-hidden">Info</span>
          </button>
        </div>

        <div className="keyboard">
          <div className="keyboard-row">
            {['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'Ü'].map((key) => (
              <button key={key} className="key">
                {key}
              </button>
            ))}
          </div>
          <div className="keyboard-row">
            {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ö', 'Ä'].map((key) => (
              <button key={key} className="key">
                {key}
              </button>
            ))}
          </div>
          <div className="keyboard-row">
            <button className="key wide">Enter</button>
            {['Y', 'X', 'C', 'V', 'B', 'N', 'M', 'ß'].map((key) => (
              <button key={key} className="key">
                {key}
              </button>
            ))}
            <button className="key wide">⌫</button>
          </div>
        </div>
      </div>
    </>
  );
}
