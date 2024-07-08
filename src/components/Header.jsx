import React from "react"
import styled from "styled-components"

const Header = () => {
	return (
		<Wrapper>
			<Title>NS-TYPING</Title>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	position: absolute;
	width: 100%;
	height: 80px;
	text-align: center;
	background-color: rgb(0, 122, 204);
	line-height: 80px;
`

const Title = styled.p`
	font-size: 50px;
	color: #ffffff;
	font-family: Impact, sans-serif;
	margin: 0;
	transform: scaleX(2);
	text-shadow: rgb(0, 0, 0) 1px 2px;
	width: 100%;
	position: relative;
`

export default Header
