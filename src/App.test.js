import React from "react"
import { render } from "@testing-library/react"
import App from "./App"

describe("App", () => {
	test("Appコンポーネントのレンダリング", () => {
		render(<App />)
	})
})
