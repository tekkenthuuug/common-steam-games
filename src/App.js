import React, { useState, Suspense, lazy } from "react";
import "./App.css";

import FormElement from "./components/FormElement/FormElement";
const CommonGames = lazy(() => import("./components/CommonGames/CommonGames"));

function App () {
	const [ commonGames, setCommonGames ] = useState([]);
	return (
		<div className="App">
			<div className="container">
				<header>
					<h1>Find common games for your party</h1>
				</header>
				<Suspense fallback={<div>Loading...</div>}>
					{commonGames.length ? (
						<CommonGames commonGames={commonGames} setCommonGames={setCommonGames} />
					) : (
						<FormElement setCommonGames={setCommonGames} />
					)}
				</Suspense>
			</div>
		</div>
	);
}

export default App;
