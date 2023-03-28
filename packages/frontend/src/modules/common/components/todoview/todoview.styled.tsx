import styled from 'styled-components';
import { THEME } from '../../consts/styles.const';

export const MainPage = styled('div')`
	width: ${THEME.width.fullWidth};
	height: ${THEME.height.fullHeight};
	display: ${THEME.display.flex};
	justify-content: ${THEME.justifyContent.center};
	align-items: ${THEME.alignItems.center};
`;
export const MainPanel = styled('div')`
	width: ${THEME.percentages.v75p};
	height: ${THEME.percentages.v85p};
	display: ${THEME.display.flex};
	flex-direction: ${THEME.flexDirection.column};
	justify-content: ${THEME.justifyContent.spaceAround};
`;

export const Title = styled('h1')``;

export const Details = styled('div')``;
export const Description = styled('h3')`
	margin: ${THEME.percentages.v1p};
`;
export const DetailsBody = styled('h5')`
	font-style: ${THEME.font.style.italic};
	font-weight: ${THEME.font.weight.normal};
	overflow: ${THEME.overflow.auto};
	padding-left: ${THEME.percentages.v5p};
	height: ${THEME.height.v200px};
`;

export const Actions = styled('div')``;
export const Action = styled('div')`
	display: ${THEME.display.flex};
	flex-direction: ${THEME.flexDirection.row};
	justify-content: ${THEME.justifyContent.spaceBetween};
	align-items: ${THEME.alignItems.center};
	padding: ${THEME.padding.v07p1p};
`;

export const Buttons = styled('div')`
	padding: ${THEME.percentages.v1p};
	display: ${THEME.display.flex};
	flex-direction: ${THEME.flexDirection.row};
	justify-content: ${THEME.justifyContent.spaceAround};
`;
