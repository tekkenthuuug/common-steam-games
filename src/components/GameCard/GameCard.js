import React, { useState } from "react";
import "./GameCard.css";
import steamBlured from "../../img/steamBlured.png";

function checkImageExists (hq, lq, setImgSrc) {
	var imageData = new Image();
	imageData.onload = function () {
		setImgSrc(hq);
	};
	imageData.onerror = function () {
		setImgSrc(lq);
	};
	imageData.src = hq;
}

export default function GameCard ({ game }) {
	const [ imgSrc, setImgSrc ] = useState("");
	checkImageExists(
		`http://cdn.akamai.steamstatic.com/steam/apps/${game.appID}/header_292x136.jpg`,
		game.logoURL,
		setImgSrc
	);
	return (
		<div className="card-container">
			<div className="menu">
				<div className="center-all">{game.name}</div>
				<div className="center-all">
					<span>
						<a href={`steam://run/${game.appID}`} target="_blank" rel="noopener noreferrer">
							Run
						</a>
					</span>
				</div>
				<div className="center-all">
					<span>
						<a href={`https://steamcommunity.com/app/${game.appID}`} target="_blank" rel="noopener noreferrer">
							Steam Store
						</a>
					</span>
				</div>
			</div>
			<img src={imgSrc || steamBlured} alt="Game logo" title={game.name} className="card" />
		</div>
	);
}
