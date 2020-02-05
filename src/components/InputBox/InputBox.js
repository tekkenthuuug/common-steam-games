import React from "react";
import "./InputBox.css";
import close from "../../img/close.svg";
import steamUnknown from "../../img/steamUnknown.jpg";

export default function InputBox ({ removeInput, getUserIfValid, id, user }) {
	const name = user.name ? (
		<a href={user.profileurl} target="_blank" rel="noopener noreferrer">
			{user.name}
		</a>
	) : (
		"Unknown"
	);

	return (
		<div className="section-container">
			<div className="flex-centered input">
				<input
					type="text"
					className="input-url"
					placeholder="Steam URL"
					onChange={getUserIfValid}
					id={id}
					autoComplete="off"
				/>
				<div className="close-box" onClick={removeInput}>
					<img src={close} alt="close button" />
				</div>
			</div>
			<div className="flex-centered profile">
				<img src={user.avatar || steamUnknown} alt="User profile" width="120px" height="120px" />
				<div className="info">
					{user.steamid ? (
						<div>
							<h2>{name}</h2>
							<p>SteamID: {user.steamid}</p>
						</div>
					) : (
						<h2>{name}</h2>
					)}
				</div>
			</div>
		</div>
	);
}
