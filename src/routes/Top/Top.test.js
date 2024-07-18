import React from "react"
import { render, screen } from "@testing-library/react"
import Top from "./Top"
import { BrowserRouter } from "react-router-dom"

describe("Top", () => {
	test("Topコンポーネントのレンダリング", () => {
		render(<Top />, { wrapper: BrowserRouter })
		const title = screen.getAllByText("YK-TYPING")
		expect(title).toHaveLength(2)
		expect(screen.getByText("数字・記号専用のタイピング練習ゲーム")).toBeInTheDocument()
		expect(screen.getByRole("button")).toBeInTheDocument()
	})
})
