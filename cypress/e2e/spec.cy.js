describe("cypressによるE2Eテスト", () => {
	it("トップページからゲームを完了し、結果画面からトップページまで戻る", () => {
		cy.visit("/")
		cy.get("[data-testid=title]").should("have.text", "YK-TYPING")
		cy.get("button").click()
		cy.url().should("include", "/play")
		cy.get('[data-testid="symbol"]').should("exist")

		for (let i = 0; i < 10; i++) {
			cy.get('[data-testid="symbol"]')
				.invoke("text")
				.then((symbol) => {
					cy.get("body").type(symbol)
				})
		}

		cy.url().should("include", "/result")

		cy.get('[data-testid="title"]').should("have.text", "結果")

		cy.get("button").click()
		cy.url().should("include", "/")
		cy.get("[data-testid=title]").should("have.text", "YK-TYPING")
	})
	it("プレイ画面からトップページへの遷移", () => {
		cy.visit("/")
		cy.get("[data-testid=title]").should("have.text", "YK-TYPING")
		cy.get("button").click()
		cy.url().should("include", "/play")
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
