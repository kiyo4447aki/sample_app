import { BrowserRouter, Route, Routes } from "react-router-dom"
import Top from "./routes/Top/Top"
import Game from "./routes/Game/Game"
import Result from "./routes/Result/Result"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" Component={Top} />
				<Route path="/play" Component={Game} />
				<Route path="/result" Component={Result} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
