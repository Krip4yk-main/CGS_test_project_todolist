import styled from 'styled-components';
import { THEME } from '../../consts/styles.const';

export const Hello = styled('div')`
	width: ${THEME.width.fullWidth};
	height: ${THEME.height.fullHeight};
	display: ${THEME.display.flex};
	margin: ${THEME.margin.auto};
	align-items: ${THEME.alignItems.center};
	justify-content: ${THEME.justifyContent.center};
`;

export const HelloCaption = styled('h1')`
	position: ${THEME.position.absolute};
	font-size: ${THEME.font.size.xxxLarge};
	margin-bottom: ${THEME.margin.v50vh};
`;

export const HelloBox = styled('div')`
	display: ${THEME.display.flex};
	flex-direction: ${THEME.flexDirection.column};
	align-items: ${THEME.alignItems.center};
`;

export const ButtonContainer = styled('div')`
	min-width: ${THEME.width.v10vw};
	min-height: ${THEME.height.v3vh};
	width: ${THEME.width.auto};
	height: ${THEME.height.auto};
	margin: ${THEME.margin.v1vh0};
`;

export const ForgotPass = styled('div')`
	font-size: ${THEME.font.size.small};
	cursor: ${THEME.cursor.pointer};
	color: ${THEME.color.blue};
	:hover {
		color: ${THEME.color.steelblue};
	}
	:active {
		color: ${THEME.color.purple};
	}
`;
