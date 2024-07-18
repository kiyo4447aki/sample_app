import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import Header from "../../components/Header"
import Container from "../../components/Container"
import GameBox from "../../components/GameBox"
import ContentWrapper from "../../components/ContentWrapper"
import ItemsWrapper from "../../components/ItemsWrapper"
import Button from "../../components/Button"
import { useNavigate } from "react-router"
import { getSymbol } from "../../utils/utils"

const Game = () => {
	const navigate = useNavigate()
	const [clearCount, setClearCount] = useState(0)
	const [missCount, setMissCount] = useState(0)
	const [symbol, setSymbol] = useState(getSymbol())
	const symbolRef = useRef(null)
	const clearCountRef = useRef(null)
	symbolRef.current = symbol
	clearCountRef.current = clearCount
	const startTime = useRef(null)
	const missCountRef = useRef(null)
	missCountRef.current = missCount

	useEffect(() => {
		document.addEventListener("keypress", onKeypress)
		startTime.current = Date.now()

		return () => {
			document.removeEventListener("keypress", onKeypress)
		}
	}, [])

	const onKeypress = (event) => {
		if (symbolRef.current === event.key) {
			setClearCount((prevCount) => prevCount + 1)
			setSymbol(getSymbol())
			const time = Date.now() - startTime.current
			if (clearCountRef.current === 10) {
				navigate("/result", { state: { missCount: missCountRef.current, time: time } })
			}
		} else {
			setMissCount((prevCount) => prevCount + 1)
		}
	}

	return (
		<Container>
			<Header />
			<ContentWrapper>
				<GameBox>
					<ItemsWrapper>
						<Text>表示された数字または記号のキーを押してください</Text>
						<Synbol>{symbol}</Synbol>
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
