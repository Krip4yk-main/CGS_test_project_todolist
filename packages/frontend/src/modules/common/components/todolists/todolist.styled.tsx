import styled from 'styled-components';
import { THEME } from '../../consts/styles.const';

export const TodoList = styled('div')`
	width: ${THEME.width.fullWidth};
	height: ${THEME.height.v90vh};
	display: ${THEME.display.flex};
	margin: ${THEME.margin.auto};
	align-items: ${THEME.alignItems.center};
	flex-direction: ${THEME.flexDirection.column};

	@media (min-width: ${THEME.width.minMax.PC}) {
		justify-content: ${THEME.justifyContent.center};
	}
	@media (max-width: ${THEME.width.minMax.PC}) {
		justify-content: ${THEME.justifyContent.normal};
	}
`;

export const Header = styled('div')`
	height: ${THEME.height.v10vh};
	width: ${THEME.percentages.v90p};
	display: ${THEME.display.flex};
	justify-content: ${THEME.justifyContent.spaceBetween};
	align-items: ${THEME.alignItems.center};
	flex-wrap: ${THEME.flexWrap.wrap};
	align-content: ${THEME.alignContent.center};

	@media (min-width: ${THEME.width.minMax.v567px}) {
		height: ${THEME.height.v90px};
	}
	@media (max-width: ${THEME.width.minMax.v567px}) {
		height: ${THEME.height.v180px};
	}
`;

export const Body = styled('div')`
	max-height: ${THEME.height.v60vh};
	width: ${THEME.percentages.v100p};
	padding: ${THEME.padding.v05vw};
`;

export const HButtons = styled('div')`
	height: ${THEME.percentages.v100p};
	margin: ${THEME.margin.v01vw};
`;

export const HSearch = styled('div')`
	height: ${THEME.height.v48px};
	align-self: ${THEME.alignSelf.center};
	text-align: ${THEME.textAlign.right};
	margin: ${THEME.margin.v01vw};
`;

export const BActions = styled('div')`
	max-height: ${THEME.percentages.v100p};
	display: ${THEME.display.flex};
	flex-direction: ${THEME.flexDirection.row};
	justify-content: ${THEME.justifyContent.spaceAround};
	align-items: ${THEME.alignItems.center};
`;

export const BActionsButtons = styled('div')`
	padding-right: ${THEME.padding.right.v1d5vh};
`;

export const MItem = styled('div')`
	display: ${THEME.display.flex};
	flex-direction: ${THEME.flexDirection.column};
	justify-content: ${THEME.justifyContent.spaceBetween};
	height: ${THEME.percentages.v100p};
	width: ${THEME.percentages.v100p};
`;

export const ITitle = styled('h2')`
	margin: ${THEME.margin.zero};
`;

export const IDescription = styled('div')`
	margin: ${THEME.margin.v1vh0};
	overflow: ${THEME.overflow.auto};
`;

export const ActionsSwitch = styled('div')`
	display: ${THEME.display.flex};
	flex-direction: ${THEME.flexDirection.column};
	font-size: ${THEME.font.size.small};
	align-items: ${THEME.alignItems.center};
`;
