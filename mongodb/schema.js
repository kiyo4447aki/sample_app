import mongoose from "mongoose"

const resultSchema = new mongoose.Schema({
	clearTime: String,
	missCount: Number,
	average: String,
	rate: String,
})

export { resultSchema }
