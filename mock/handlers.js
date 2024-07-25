import getSymbol from "../api/getSymbol"
import { http } from "msw"

const handlers = [
	http.get("http://webapi.kiyoakiyamamoto.info/getsymbol", (req, res, ctx) => {
		return res(ctx.status(200), ctx.text(getSymbol()))
	}),
]

export { handlers }
