import React from "react"
import styled from "styled-components"
import Header from "../../components/Header"
import Container from "../../components/Container"
import GameBox from "../../components/GameBox"
import ContentWrapper from "../../components/ContentWrapper"
import ItemsWrapper from "../../components/ItemsWrapper"
import Button from "../../components/Button"
import { useLocation, useNavigate } from "react-router"
import { getAverage, msToTimestamp } from "../../utils/utils"

const Result = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const ms = location.state.time
	const time = msToTimestamp(ms)
	const missCount = location.state.missCount
	const rate = String((10 / (10 + missCount)) * 100).slice(0, 5)
	const average = getAverage(ms)

	return (
		<Container>
			<Header />
			<ContentWrapper>
				<GameBox>
					<ItemsWrapper>
						<Title>結果</Title>
						<List>
							<ListItem>
								経過時間: <BlueText>{time}</BlueText>
							</ListItem>
							<ListItem>
								正しく打ったキーの数: <BlueText>10</BlueText>
							</ListItem>
							<ListItem>
								平均キータイプ数: <BlueText>{average}</BlueText>回/秒
							</ListItem>
							<ListItem>
								ミスタイプ数: <BlueText>{missCount}</BlueText>
							</ListItem>
							<ListItem>
								正確率: <BlueText>{rate}</BlueText>%
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
