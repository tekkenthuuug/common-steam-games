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
	users : [
		{
			steamid    : "",
			name       : "",
			profileurl : "",
			avatar     : "",
			request    : undefined
		},
		{
			steamid    : "",
			name       : "",
			profileurl : "",
			avatar     : "",
			request    : undefined
		}
	]
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
				this.setState({ users: usersClone }, () => {
					console.log(this.state);
				});
			});
	};

	isInputValid = (input) => {
		const inputArr = input.split("/");
		if (inputArr.length - inputArr.indexOf("id") === 2 && inputArr[inputArr.length - 1] !== "") {
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

	findCommonElements = (arr) => {
		// Sorts array by length of elements DESC
		arr.sort((a, b) => {
			return b.length - a.length;
		});
		let result = [];
		for (let i = 1; i < arr[0].length; i++) {
			let match = 0;
			for (let g = 0; g < arr.length; g++) {
				for (let t = 0; t < arr[g].length; t++) {
					if (arr[g][t].appID === arr[0][i].appID) {
						match++;
					}
					if (match === arr.length) {
						match = 0;
						result.push(arr[0][i]);
					}
				}
			}
		}
		return result;
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
				this.props.setCommonGames(this.findCommonElements(data));
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
