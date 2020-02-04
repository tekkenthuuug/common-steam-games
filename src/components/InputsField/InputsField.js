import React from "react";
import "./InputsField.css";
import IndInput from "../IndInput/IndInput";

export default function InputsField ({ removeInput, getUserIfValid, users }) {
	return (
		<div className="inputs">
			{users.map((user, index) => {
				return (
					<IndInput key={index} id={index} removeInput={removeInput} getUserIfValid={getUserIfValid} user={user} />
				);
			})}
		</div>
	);
}
