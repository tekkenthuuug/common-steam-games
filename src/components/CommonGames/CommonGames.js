import React, { useState, useEffect } from 'react';
import GameCard from '../GameCard/GameCard';
import { Link } from 'react-router-dom';

import './CommonGames.css';

export default function CommonGames({ match }) {
  const [commonGames, setCommonGames] = useState([]);

  const findCommonObjectsByName = (arr) => {
    let games = [];
    // All game objects
    arr.forEach((arr) => {
      games = games.concat(arr);
    });
    // All game names
    games = games.map((el) => el.name);
    // All game names without duplicates
    const arrNoDuplicates = Array.from(new Set(games));
    const commonGames = arrNoDuplicates.filter((el) => {
      let count = 0;
      games.forEach((game) => {
        if (game === el) count++;
      });
      return count >= arr.length;
    });
    return arr[0].filter((el) => commonGames.includes(el.name));
  };

  const fetchGames = (steamids) => {
    fetch('https://common-games-api.herokuapp.com/getUserGames', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        steamids
      })
    })
      .then((response) => response.json())
      .then((data) => {
        setCommonGames(findCommonObjectsByName(data));
      });
  };

  useEffect(() => {
    fetchGames(match.params.ids.split(',').filter((id) => id !== ''));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Link to="/" className="back-button">
        Go Back
      </Link>
      {commonGames.length ? (
        <div className="dgrid">
          {commonGames.map((game, index) => {
            return <GameCard key={index} game={game} className="card" />;
          })}
        </div>
      ) : (
        <h1 style={{ marginTop: '20px' }}>Loading...</h1>
      )}
    </>
  );
}
