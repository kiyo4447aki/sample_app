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
	})
})
