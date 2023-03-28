import styled from 'styled-components';
import { THEME } from '../../consts/styles.const';

export const Forgot = styled('div')`
	width: ${THEME.width.fullWidth};
	height: ${THEME.height.fullHeight};
	display: ${THEME.display.flex};
	margin: ${THEME.margin.auto};
	align-items: ${THEME.alignItems.center};
	justify-content: ${THEME.justifyContent.center};
	flex-direction: ${THEME.flexDirection.column};
`;

export const FormPart = styled('div')`
	display: ${THEME.display.flex};
	flex-direction: ${THEME.flexDirection.column};
	align-items: ${THEME.alignItems.start};
	min-width: ${THEME.width.v20vw};
	width: ${THEME.percentages.v100p};
	margin: ${THEME.margin.v1vh0};
	text-align-last: ${THEME.textAlignLast.left};
`;

export const FormButtons = styled('div')`
	display: ${THEME.display.flex};
	justify-content: ${THEME.justifyContent.spaceBetween};
	margin: ${THEME.margin.v1vh0};
`;

export const Form = styled('form')`
	text-align-last: ${THEME.textAlignLast.center};
`;

export const RedText = styled('span')`
	color: ${THEME.color.red};
	font-size: ${THEME.font.size.xSmall};
`;
