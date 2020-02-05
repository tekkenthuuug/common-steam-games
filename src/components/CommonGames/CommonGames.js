import React from "react";

import GameCard from "../GameCard/GameCard";

import "./CommonGames.css";

export default function CommonGames ({ setCommonGames, commonGames }) {
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
