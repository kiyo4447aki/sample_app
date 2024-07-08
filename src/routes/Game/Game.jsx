import React, { useState } from "react"
import styled from "styled-components"
import Header from "../../components/Header"
import Container from "../../components/Container"
import GameBox from "../../components/GameBox"
import ContentWrapper from "../../components/ContentWrapper"
import ItemsWrapper from "../../components/ItemsWrapper"
import Button from "../../components/Button"
import { useNavigate } from "react-router"

const Game = () => {
	const navigate = useNavigate()
	const [clearCount, setClearCount] = useState(0)
	const [missCount, setMissCount] = useState()
	const [symbol, setSymbol] = useState()
	return (
		<Container>
			<Header />
			<ContentWrapper>
				<GameBox>
					<ItemsWrapper>
						<Text>表示された数字または記号のキーを押してください</Text>
						<Synbol>(</Synbol>
						<FooterWrapper>
							<FooterText>問題数: 10</FooterText>
							<FooterText>正解数: {clearCount}</FooterText>
							<Button
								onClick={() => {
									navigate("/")
								}}
							>
								タイトルに戻る
							</Button>
						</FooterWrapper>
					</ItemsWrapper>
				</GameBox>
			</ContentWrapper>
		</Container>
	)
}

const Text = styled.p`
	font-size: 20px;
`

const Synbol = styled.p`
	flex: 1;
	font-size: 90px;
`

const FooterWrapper = styled.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
	align-items: center;
	margin: 0;
`

const FooterText = styled.p`
	margin: 0;
`

export default Game
