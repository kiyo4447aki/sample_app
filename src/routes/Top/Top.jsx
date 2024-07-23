import React from "react"
import styled from "styled-components"
import Header from "../../components/Header"
import Container from "../../components/Container"
import GameBox from "../../components/GameBox"
import ContentWrapper from "../../components/ContentWrapper"
import ItemsWrapper from "../../components/ItemsWrapper"
import Button from "../../components/Button"
import { useNavigate } from "react-router"

const Top = () => {
	const navigate = useNavigate()

	return (
		<Container>
			<Header />
			<ContentWrapper>
				<GameBox>
					<ItemsWrapper>
						<Title data-testid="title">YK-TYPING</Title>
						<Subtitle data-testid="subtitle">
							数字・記号専用のタイピング練習ゲーム
						</Subtitle>
						<Button
							onClick={() => {
								navigate("/play")
							}}
						>
							プレイする
						</Button>
					</ItemsWrapper>
				</GameBox>
			</ContentWrapper>
		</Container>
	)
}

const Title = styled.h1`
	font-family: impact, sans-serif;
	font-size: 40px;
	font-weight: bold;
`

const Subtitle = styled.h1`
	font-family: "Hiragino Kaku Gothic ProN", sans-serif;
	font-size: 16px;
	font-weight: normal;
`

export default Top
