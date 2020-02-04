import React from "react";

import GameCard from "../GameCard/GameCard";

import "./CommonGamesField.css";

export default function CommonGamesField ({ setCommonGames, commonGames }) {
	commonGames = commonGames.filter((game) => !game.name.toLowerCase().split(" ").includes("test"));
	return (
		<>
			<button onClick={() => setCommonGames([])} className="back-button">Go Back</button>
			<div className="dgrid">
				{commonGames.map((game, index) => {
					return <GameCard key={index} game={game} className="card" />;
				})}
			</div>
		</>
	);
}
