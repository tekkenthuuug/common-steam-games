import React, { Component } from "react";
import "./FormElement.css";

import InputsField from "../InputsField/InputsField";

const initialUser = {
	steamid    : "",
	name       : "",
	profileurl : "",
	avatar     : "",
	request    : undefined
};

const initialState = {
	users : [ Object.assign({}, initialUser), Object.assign({}, initialUser) ]
};

export class FormElement extends Component {
	constructor (props) {
		super();
		this.state = initialState;
	}

	addInput = () => {
		if (this.state.users.length < 5) {
			const usersClone = [ ...this.state.users ];
			usersClone.push({
				...initialUser
			});
			this.setState({ users: usersClone });
		}
	};

	removeInput = () => {
		if (this.state.users.length > 2) {
			const usersClone = [ ...this.state.users ];
			usersClone.pop();
			this.setState({ users: usersClone });
		}
	};

	fetchUserInfo = (profileURL, id) => {
		fetch("https://common-games-api.herokuapp.com/getSteamInfo", {
			method  : "post",
			headers : { "Content-Type": "application/json" },
			body    : JSON.stringify({
				profileURL
			})
		})
			.then((response) => response.json())
			.then((data) => {
				const usersClone = [ ...this.state.users ];
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
				this.setState({ users: usersClone });
			});
	};

	deleteLastSlash = (url) => {
		return url[url.length - 1] === "/" ? url.slice(0, url.length - 1) : url;
	};

	isInputValid = (input) => {
		const inputArr = this.deleteLastSlash(input).split("/");
		if (inputArr.length - inputArr.indexOf("id") === 2) {
			return true;
		}
		return false;
	};

	getUserIfValid = (event) => {
		const { fetchUserInfo, isInputValid } = this;
		const target = event.target;

		const usersClone = [ ...this.state.users ];

		if (isInputValid(target.value)) {
			if (target.value === "") {
				usersClone[target.id] = { ...initialUser };
			} else {
				clearTimeout(this.state.users[target.id].request);
				usersClone[target.id].request = setTimeout(() => {
					fetchUserInfo(target.value, target.id);
				}, 1000);
			}
		} else {
			usersClone[target.id] = { ...initialUser };
			usersClone[target.id].name = "Not valid input";
		}
		this.setState({ users: usersClone });
	};

	findCommonObjectsByName = (arr) => {
		let games = [];
		arr.forEach((arr) => {
			games = games.concat(arr);
		});
		games = games.map((el) => el.name);
		const arrNoDuplicates = Array.from(new Set(games));
		const commonGames = arrNoDuplicates.filter((el) => games.indexOf(el) !== games.lastIndexOf(el));
		return arr[0].filter((el) => commonGames.includes(el.name));
	};

	fetchGames = () => {
		const steamids = [];
		this.state.users.forEach(({ steamid }) => {
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
				this.props.setCommonGames(this.findCommonObjectsByName(data));
			});
	};

	render () {
		const { addInput, removeInput, getUserIfValid, fetchGames } = this;
		const { users } = this.state;
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
	}
}

export default FormElement;
