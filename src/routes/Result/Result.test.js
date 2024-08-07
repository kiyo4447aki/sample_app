import Top from "../Top/Top"
import Result from "../Result/Result"

import { render, screen, waitFor } from "@testing-library/react"
import { BrowserRouter, Routes, Route, MemoryRouter, useLocation } from "react-router-dom"
import { userEvent } from "@testing-library/user-event"

import axios from "axios"

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useLocation: jest.fn(),
}))

jest.mock("axios")

describe("Result", () => {
	test("レンダリング", () => {
		axios.get.mockResolvedValue({
			status: 200,
			data: { clearTime: "00:00:00", average: "1.0", missCount: 0, rate: "100" },
		})
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
		axios.get.mockResolvedValue({
			status: 200,
			data: { clearTime: "00:00:00", average: "1.0", missCount: 0, rate: "100" },
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
	test("結果が正しく表示される", async () => {
		const mockUseLocation = useLocation
		mockUseLocation.mockReturnValue({
			state: {
				missCount: 5,
				time: 100000,
			},
		})
		axios.get.mockResolvedValue({
			status: 200,
			data: { clearTime: "00:00:00", average: "1.0", missCount: 0, rate: "100" },
		})
		axios.post.mockResolvedValue({
			status: 200,
		})
		render(<Result />, { wrapper: BrowserRouter })
		await waitFor(() => {
			expect(screen.getAllByText("01:40:00")[0]).toBeInTheDocument()
		})
		expect(screen.getAllByText("10")[0]).toBeInTheDocument()
		expect(screen.getAllByText("0.3")[0]).toBeInTheDocument()
		expect(screen.getAllByText("5")[0]).toBeInTheDocument()
		expect(screen.getAllByText("66.66")[0]).toBeInTheDocument()

		expect(screen.getAllByText("00:00:00")[0]).toBeInTheDocument()
		expect(screen.getAllByText("1.0")[0]).toBeInTheDocument()
		expect(screen.getAllByText("0")[0]).toBeInTheDocument()
		expect(screen.getAllByText("100")[0]).toBeInTheDocument()
	})
})
