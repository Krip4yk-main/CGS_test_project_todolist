import styled from 'styled-components';
import { THEME } from '../../consts/styles.const';

export const MainForm = styled('div')`
	position: ${THEME.position.absolute};
	top: ${THEME.zero};
	left: ${THEME.zero};
	width: ${THEME.width.fullWidth};
	height: ${THEME.height.fullHeight};
	background-color: ${THEME.backgroundColor.grayMask020};
	z-index: ${THEME.zIndex.lvl9};
	display: ${THEME.display.flex};
	align-items: ${THEME.alignItems.center};
	justify-content: ${THEME.justifyContent.center};
`;

export const MainPanel = styled('div')`
	min-width: ${THEME.width.v40vw};
	z-index: ${THEME.zIndex.lvl10};
`;

export const Form = styled('form')`
	display: ${THEME.display.flex};
	flex-direction: ${THEME.flexDirection.column};
`;

export const Title = styled('h2')`
	padding: ${THEME.padding.v8px};
`;

export const FButtons = styled('div')`
	padding: ${THEME.padding.v8px};
	display: ${THEME.display.flex};
	flex-direction: ${THEME.flexDirection.row};
	justify-content: ${THEME.justifyContent.spaceAround};
`;
