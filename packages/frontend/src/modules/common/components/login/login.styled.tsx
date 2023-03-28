import styled from 'styled-components';
import { THEME } from '../../consts/styles.const';

export const Login = styled('div')`
	width: ${THEME.width.fullWidth};
	height: ${THEME.height.fullHeight};
	display: ${THEME.display.flex};
	margin: ${THEME.margin.auto};
	align-items: ${THEME.alignItems.center};
	justify-content: ${THEME.justifyContent.center};
`;

export const Caption = styled('h1')`
	position: ${THEME.position.absolute};
	font-size: ${THEME.font.size.xxxLarge};
	margin-bottom: ${THEME.margin.v50vh};
`;

export const FormPart = styled('div')`
	display: ${THEME.display.flex};
	flex-direction: ${THEME.flexDirection.column};
	align-items: ${THEME.alignItems.start};
	min-width: ${THEME.width.v20vw};
	width: ${THEME.percentages.v100p};
	margin: ${THEME.margin.v1vh0};
`;

export const FormButtons = styled('div')`
	display: ${THEME.display.flex};
	justify-content: ${THEME.justifyContent.spaceBetween};
	margin: ${THEME.margin.v1vh0};
`;

export const Form = styled('form')``;

export const RedText = styled('span')`
	color: red;
	font-size: xx-small;
`;
