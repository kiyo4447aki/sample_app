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
		render(<Result />, { wrapper: BrowserRouter })
		expect(screen.getByText("結果")).toBeInTheDocument()
		expect(screen.getByTestId("time")).toBeInTheDocument()
		expect(screen.getByTestId("correctCount")).toBeInTheDocument()
		expect(screen.getByTestId("average")).toBeInTheDocument()
		expect(screen.getByTestId("missCount")).toBeInTheDocument()
		expect(screen.getByTestId("rate")).toBeInTheDocument()
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
	test("結果が正しく表示される", () => {
		const mockUseLocation = useLocation
		mockUseLocation.mockReturnValue({
			state: {
				missCount: 5,
				time: 100000,
			},
		})
		render(<Result />, { wrapper: BrowserRouter })
		expect(screen.getByText("01:40:00")).toBeInTheDocument()
		expect(screen.getByText("10")).toBeInTheDocument()
		expect(screen.getByText("0.3")).toBeInTheDocument()
		expect(screen.getByText("5")).toBeInTheDocument()
		expect(screen.getByText("66.66")).toBeInTheDocument()
	})
})
