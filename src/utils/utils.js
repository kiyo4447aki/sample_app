const msToTimestamp = (time) => {
	if (typeof time != "number") throw new Error("invalid type")
	if (time > 3599999) {
		time = 3599999
	}
	const milliseconds = `00${time % 1000}`.slice(-3, -1)
	const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2)
	const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2)

	const result = `${minutes}:${seconds}:${milliseconds}`
	return result
}

const getAverage = (ms) => {
	if (typeof ms != "number") throw new Error("invalid type")
	const average = String((10 / Math.floor((ms / 1000) % 60)).toFixed(1)).slice(0, 3)
	return average
}

const getSymbol = () => {
	const symbolList = [
		"!",
		"'",
		'"',
		"`",
		"#",
		"$",
		"%",
		"&",
		"(",
		")",
		"*",
		"+",
		",",
		"-",
		".",
		"/",
		":",
		";",
		"<",
		">",
		"?",
		"=",
		"@",
		"[",
		"]",
		"\\",
		"^",
		"{",
		"}",
		"_",
		"|",
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
	]

	const symbol = symbolList[Math.floor(Math.random() * symbolList.length)]
	return symbol
}

export { getSymbol, msToTimestamp, getAverage }
