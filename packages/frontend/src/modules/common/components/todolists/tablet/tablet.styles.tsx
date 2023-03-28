import styled from 'styled-components';
import { THEME } from '../../../consts/styles.const';

export const MainPage = styled('div')`
	width: ${THEME.width.v60vw};
	max-width: ${THEME.width.v60vw};
	height: ${THEME.height.v80vh};
	overflow: ${THEME.overflow.auto};
	display: ${THEME.display.flex};
	flex-direction: ${THEME.flexDirection.row};
	position: ${THEME.position.absolute};
	align-items: ${THEME.alignItems.center};
	margin: ${THEME.margin.v015vw};
`;
