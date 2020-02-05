import React from "react";
import "./InputsField.css";
import InputBox from "../InputBox/InputBox";

export default function InputsField ({ removeInput, getUserIfValid, users }) {
	return (
		<div className="inputs">
			{users.map((user, index) => {
				return (
					<InputBox key={index} id={index} removeInput={removeInput} getUserIfValid={getUserIfValid} user={user} />
				);
			})}
		</div>
	);
}
