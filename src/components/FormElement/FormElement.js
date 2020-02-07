import React, { useState } from "react";
import "./FormElement.css";

import InputsField from "../InputsField/InputsField";

const initialUser = {
	steamid    : "",
	name       : "",
	profileurl : "",
	avatar     : "",
	request    : undefined
};

export const FormElement = (props) => {
	const [ users, setUsers ] = useState([ Object.assign({}, initialUser), Object.assign({}, initialUser) ]);

	const addInput = () => {
		if (users.length < 5) {
			const usersClone = [ ...users ];
			usersClone.push({
				...initialUser
			});
			setUsers(usersClone);
		}
	};

	const removeInput = () => {
		if (users.length > 2) {
			const usersClone = [ ...users ];
			usersClone.pop();
			setUsers(usersClone);
		}
	};

	const fetchUserInfo = (profileURL, id) => {
		fetch("https://common-games-api.herokuapp.com/getSteamInfo", {
			method  : "post",
			headers : { "Content-Type": "application/json" },
			body    : JSON.stringify({
				profileURL
			})
		})
			.then((response) => response.json())
			.then((data) => {
				const usersClone = [ ...users ];
				if (data.steamid) {
					const { steamid, name, profileurl, avatar } = data;
					usersClone[id] = {
						steamid,
						name,
						profileurl,
						avatar
					};
				} else {
					usersClone[id] = { ...initialUser };
					usersClone[id].name = "Not Found";
				}
				setUsers(usersClone);
			});
	};

	const deleteLastSlash = (url) => {
		return url[url.length - 1] === "/" ? url.slice(0, url.length - 1) : url;
	};

	const isInputValid = (input) => {
		const inputArr = deleteLastSlash(input).split("/");
		if (inputArr.length - inputArr.indexOf("id") === 2) {
			return true;
		}
		return false;
	};

	const getUserIfValid = (event) => {
		const target = event.target;

		const usersClone = [ ...users ];

		if (isInputValid(target.value)) {
			if (target.value === "") {
				usersClone[target.id] = { ...initialUser };
			} else {
				clearTimeout(users[target.id].request);
				usersClone[target.id].request = setTimeout(() => {
					fetchUserInfo(target.value, target.id);
				}, 1000);
			}
		} else {
			usersClone[target.id] = { ...initialUser };
			usersClone[target.id].name = "Not valid input";
		}
		setUsers(usersClone);
	};

	const findCommonObjectsByName = (arr) => {
		let games = [];
		arr.forEach((arr) => {
			games = games.concat(arr);
		});
		games = games.map((el) => el.name);
		const arrNoDuplicates = Array.from(new Set(games));
		const commonGames = arrNoDuplicates.filter((el) => games.indexOf(el) !== games.lastIndexOf(el));
		return arr[0].filter((el) => commonGames.includes(el.name));
	};

	const fetchGames = () => {
		const steamids = [];
		users.forEach(({ steamid }) => {
			if (steamid) {
				steamids.push(steamid);
			}
		});

		fetch("https://common-games-api.herokuapp.com/getUserGames", {
			method  : "post",
			headers : { "Content-Type": "application/json" },
			body    : JSON.stringify({
				steamids
			})
		})
			.then((response) => response.json())
			.then((data) => {
				props.setCommonGames(findCommonObjectsByName(data));
			});
	};

	return (
		<div className="form-box">
			<InputsField removeInput={removeInput} getUserIfValid={getUserIfValid} users={users} />
			<div className="button-container">
				{users.length === 5 ? (
					""
				) : (
					<button className="add-button" onClick={addInput}>
						<span>+</span>
					</button>
				)}
				<button className="fetch-button" onClick={fetchGames}>
					Fetch games
				</button>
			</div>
		</div>
	);
};

export default FormElement;
