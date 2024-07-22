import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import Header from "../../components/Header"
import Container from "../../components/Container"
import GameBox from "../../components/GameBox"
import ContentWrapper from "../../components/ContentWrapper"
import ItemsWrapper from "../../components/ItemsWrapper"
import Button from "../../components/Button"
import { useLocation, useNavigate } from "react-router-dom"
import { getAverage, msToTimestamp } from "../../utils/utils"

const Result = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const [time, setTime] = useState()
	const missCount = useRef()
	const rate = useRef()
	const average = useRef()

	useEffect(() => {
		if (!location.state) {
			navigate("/", { replace: true })
		} else {
			const ms = location.state.time
			setTime(msToTimestamp(ms))
			missCount.current = location.state.missCount
			rate.current = String((10 / (10 + missCount.current)) * 100).slice(0, 5)
			average.current = getAverage(ms)
		}
	}, [])

	return (
		<Container>
			<Header />
			<ContentWrapper>
				<GameBox>
					<ItemsWrapper>
						<Title>結果</Title>
						<List>
							<ListItem data-testid="time">
								経過時間: <BlueText>{time}</BlueText>
							</ListItem>
							<ListItem data-testid="correctCount">
								正しく打ったキーの数: <BlueText>10</BlueText>
							</ListItem>
							<ListItem data-testid="average">
								平均キータイプ数: <BlueText>{average.current}</BlueText>回/秒
							</ListItem>
							<ListItem data-testid="missCount">
								ミスタイプ数: <BlueText>{missCount.current}</BlueText>
							</ListItem>
							<ListItem data-testid="rate">
								正確率: <BlueText>{rate.current}</BlueText>%
							</ListItem>
						</List>
						<Button
							onClick={() => {
								navigate("/")
							}}
						>
							タイトルに戻る
						</Button>
					</ItemsWrapper>
				</GameBox>
			</ContentWrapper>
		</Container>
	)
}

const Title = styled.p`
	font-size: 50px;
`

const List = styled.ul`
	width: 80%;
	flex: 1;
`

const ListItem = styled.li`
	font-size: 20px;
`

const BlueText = styled.span`
	font-weight: bold;
	color: rgb(0, 122, 204);
`

export default Result
