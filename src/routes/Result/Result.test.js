import Top from "../Top/Top"
import Result from "../Result/Result"

import { render, screen, waitFor } from "@testing-library/react"
import { BrowserRouter, Routes, Route, MemoryRouter, useLocation } from "react-router-dom"
import { userEvent } from "@testing-library/user-event"

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useLocation: jest.fn(),
}))

describe("Result", () => {
	test("レンダリング", () => {
		const mockUseLocation = useLocation
		mockUseLocation.mockReturnValue({
			state: {
				missCount: 5,
				time: 100000,
			},
		})
		const { container } = render(<Result />, { wrapper: BrowserRouter })
		expect(screen.getByText("結果")).toBeInTheDocument()
		expect(screen.getByText("経過時間: ")).toBeInTheDocument()
		expect(screen.getByText("正しく打ったキーの数")).toBeInTheDocument()
		expect(screen.getByText("平均キータイプ数")).toBeInTheDocument()
		expect(screen.getByText("ミスタイプ数")).toBeInTheDocument()
		expect(screen.getByText("正確率")).toBeInTheDocument()
	})
	test("タイトルに戻るボタンを押下し、トップページに遷移できる", async () => {
		const mockUseLocation = useLocation
		mockUseLocation.mockReturnValue({
			state: {
				missCount: 5,
				time: 100000,
			},
		})
		render(
			<MemoryRouter initialEntries={["/result"]}>
				<Routes>
					<Route path="/result" Component={Result} />
					<Route path="/" Component={Top} />
				</Routes>
			</MemoryRouter>
		)
		const user = userEvent.setup()
		await user.click(screen.getByRole("button"))
		expect(screen.getByText("数字・記号専用のタイピング練習ゲーム")).toBeInTheDocument()
	})
})
