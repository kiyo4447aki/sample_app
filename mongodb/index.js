import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import { resultSchema } from "./schema.js"
import { decycle } from "json-cyclic"

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time))
await sleep(30000)

const app = express()

const mongooseUri = "mongodb://kiyo:mongoPass@service-game-app-mongo-db:27017/"
await mongoose.connect(mongooseUri)

app.use(cors())
app.use((err, req, res, next) => {
	res.status(500).send("Internal Server Error")
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const resultResorce = mongoose.model("results", resultSchema)

app.post("/result/create", async (req, res) => {
	const result = new resultResorce(req.body)
	result
		.save()
		.then(() => {
			res.status(201).send("created")
		})
		.catch((e) => {
			console.error(e)
			res.status(500).send("request failed")
		})
})

app.get("/result/latest", async (req, res) => {
	const result = await resultResorce.findOne().sort({ _id: -1 }).limit(1)
	res.status(200).json(result)
})

const port = 5000

app.listen(port, () => {
	console.log(`Server is started. port:${port}`)
})
