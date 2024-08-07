import express from "express"
import cors from "cors"
import { Sequelize } from "sequelize"
import { resultModel } from "./model.js"
import bodyParser from "body-parser"

const app = express()

app.use(cors())
app.use((err, req, res, next) => {
	res.status(500).send("Internal Server Error")
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const db = new Sequelize(`postgres://kiyo:postgresPass@localhost:5432/kiyo`)

const Result = db.define("Result", resultModel)

Result.sync()

app.post("/result/create", async (req, res) => {
	try {
		await db.authenticate()
	} catch (e) {
		res.status(500).send("DB connection error")
	}
	Result.create(req.body)
	console.log(req.body)
	res.status(201).send("created")
})

app.get("/result/latest", async (req, res) => {
	try {
		await db.authenticate()
	} catch (e) {
		res.status(500).send("DB connection error")
		console.error(e)
	}
	const result = await Result.findOne({ order: [["createdAt", "DESC"]] })
	res.status(200).json(result)
})

const port = 5000
app.listen(port, () => {
	console.log(`Server is started. port:${port}`)
})
