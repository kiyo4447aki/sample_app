import React from "react"
import { render, screen } from "@testing-library/react"
import Top from "./Top"
import Game from "../Game/Game"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import userEvent from "@testing-library/user-event"

describe("Top", () => {
	test("Topコンポーネントのレンダリング", () => {
		render(<Top />, { wrapper: BrowserRouter })
		const title = screen.getAllByText("YK-TYPING")
		expect(title).toHaveLength(2)
		expect(screen.getByText("数字・記号専用のタイピング練習ゲーム")).toBeInTheDocument()
		expect(screen.getByRole("button")).toBeInTheDocument()
	})
	test("ボタンを押下し、プレイページに遷移できる", async () => {
		render(
			<BrowserRouter>
				<Routes>
					<Route path="/" Component={Top} />
					<Route path="/play" Component={Game} />
				</Routes>
			</BrowserRouter>
		)
		const user = userEvent.setup()
		await user.click(screen.getByRole("button"))
		expect(
			screen.getByText("表示された数字または記号のキーを押してください")
		).toBeInTheDocument()
	})
})
