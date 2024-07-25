import express from "express"
import cors from "cors"
import getSymbol from "./getSymbol.js"

const app = express()

app.use(cors())

app.get("/getSymbol", (req, res) => {
	const symbol = getSymbol()
	res.send(symbol)
})

const port = 4000
app.listen(port, () => {
	console.log(`Server is started. port:${port}`)
})
