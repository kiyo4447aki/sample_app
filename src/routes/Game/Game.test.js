import Game from "./Game"
import Top from "../Top/Top"
import Result from "../Result/Result"

import { render, screen, waitFor } from "@testing-library/react"
import { BrowserRouter, Routes, Route, MemoryRouter } from "react-router-dom"
import { userEvent } from "@testing-library/user-event"

import axios from "axios"
import { getSymbol } from "../../utils/utils"
jest.mock("axios")

describe("Game", () => {
	test("Gameコンポーネントのレンダリング", () => {
		axios.get.mockResolvedValue({ status: 200, data: getSymbol() })
		render(<Game />, { wrapper: BrowserRouter })
		expect(
			screen.getByText("表示された数字または記号のキーを押してください")
		).toBeInTheDocument()
		expect(screen.getByText("問題数: 10")).toBeInTheDocument()
		expect(screen.getByText("正解数: 0")).toBeInTheDocument()
		expect(screen.getByRole("button")).toBeInTheDocument()
	})
	test("タイトルに戻るボタンを押下し、トップページに遷移できる", async () => {
		axios.get.mockResolvedValue({ status: 200, data: getSymbol() })
		render(
			<MemoryRouter initialEntries={["/play"]}>
				<Routes>
					<Route path="/play" Component={Game} />
					<Route path="/" Component={Top} />
				</Routes>
			</MemoryRouter>
		)
		const user = userEvent.setup()
		await user.click(screen.getByRole("button"))
		expect(screen.getByText("数字・記号専用のタイピング練習ゲーム")).toBeInTheDocument()
	})
	test("正解数が正しくカウントされ、10問正解後に結果画面へ遷移する", async () => {
		axios.get.mockResolvedValue({ status: 200, data: getSymbol() })
		const { container } = render(
			<MemoryRouter initialEntries={["/play"]}>
				<Routes>
					<Route path="/play" Component={Game} />
					<Route path="/result" Component={Result} />
				</Routes>
			</MemoryRouter>
		)
		const user = userEvent.setup()
		let symbol
		await new Promise((resolve) => setTimeout(resolve, 1000))
		for (let i = 0; i < 10; i++) {
			symbol = container.getElementsByClassName("symbol").item(0)?.textContent
			if (symbol === "{") {
				symbol = "{{"
			} else if (symbol === "[") {
				symbol = "[["
			}
			await user.keyboard(symbol)
			if (i !== 9) {
				await new Promise((resolve) => setTimeout(resolve, 100))
				expect(screen.getByText(`正解数: ${i + 1}`)).toBeInTheDocument()
			}
		}
		await waitFor(() => {
			expect(screen.getByText("結果")).toBeInTheDocument()
		})
	})
	test("不正解のとき、正解数が増えず、画面遷移を行わない", async () => {
		axios.get.mockResolvedValue({ status: 200, data: getSymbol() })
		render(
			<MemoryRouter initialEntries={["/play"]}>
				<Routes>
					<Route path="/play" Component={Game} />
					<Route path="/result" Component={Result} />
				</Routes>
			</MemoryRouter>
		)
		const user = userEvent.setup()
		for (let i = 0; i < 10; i++) {
			await user.keyboard("あ")
		}
		await waitFor(() => {
			expect(screen.getByText("正解数: 0")).toBeInTheDocument()
		})
	})
})
