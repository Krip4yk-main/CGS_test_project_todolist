import styled from 'styled-components';
import { THEME } from '../../consts/styles.const';

export const MainPage = styled('div')`
	width: ${THEME.width.fullWidth};
	height: ${THEME.height.fullHeight};
	display: ${THEME.display.flex};
	margin: ${THEME.margin.auto};
	flex-direction: ${THEME.flexDirection.column};
`;

export const Header = styled('div')`
	width: ${THEME.width.fullWidth};
	height: ${THEME.height.vc8pxp5vh};
	display: ${THEME.display.flex};
	flex-direction: ${THEME.flexDirection.row};
	align-items: ${THEME.alignItems.center};
	justify-content: ${THEME.justifyContent.end};
	font-size: ${THEME.font.size.v1d5vh};
`;

export const HButton = styled('div')`
	margin: ${THEME.margin.v8px};
`;

export const Body = styled('div')`
	width: ${THEME.width.fullWidth};
	height: ${THEME.height.v96vh};
`;
