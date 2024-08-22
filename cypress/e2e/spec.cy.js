import { getSymbol } from "../../src/utils/utils"

describe("cypressによるE2Eテスト", () => {
	beforeEach(() => {
		cy.intercept("GET", "http://webapi.kiyoakiyamamoto.info/getsymbol", {
			statusCode: 200,
			body: getSymbol(),
		})
		cy.intercept("GET", "http://mongo.webapi.kiyoakiyamamoto.info/result/latest", {
			statusCode: 200,
			body: { clearTime: "00:00:00", average: "1.0", missCount: 0, rate: "100" },
		})
		cy.intercept("POST", "http://mongo.webapi.kiyoakiyamamoto.info/result/create", {
			statusCode: 200,
		})
	})

	it("トップページからゲームを完了し、結果画面からトップページまで戻る", () => {
		cy.visit("/")
		cy.get("[data-testid=title]").should("have.text", "YK-TYPING")
		cy.get("button").click()

		cy.wait(500)
		cy.get('[data-testid="symbol"]').should("exist")

		for (let i = 0; i < 10; i++) {
			cy.get('[data-testid="symbol"]')
				.invoke("text")
				.then(async (symbol) => {
					await new Promise((resolve) => setTimeout(resolve, 1000))
					cy.get("body").type(symbol)
				})
		}

		cy.get('[data-testid="title"]').should("have.text", "結果")

		cy.get("button").click()

		cy.get("[data-testid=title]").should("have.text", "YK-TYPING")
	})
	it("プレイ画面からトップページへの遷移", () => {
		cy.visit("/")
		cy.get("[data-testid=title]").should("have.text", "YK-TYPING")
		cy.get("button").click()

		cy.get("button").click()
		cy.url().should("include", "/")
		cy.get("[data-testid=title]").should("have.text", "YK-TYPING")
	})
	it("/resultへ直接飛んだ際に、トップページへリダイレクト", () => {
		cy.visit("/result")
		cy.url().should("include", "/")
		cy.get("[data-testid=title]").should("have.text", "YK-TYPING")
	})
})
