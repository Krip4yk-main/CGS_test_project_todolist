import styled from 'styled-components';
import { THEME } from '../../../consts/styles.const';

export const MainPage = styled('div')`
	height: ${THEME.height.v80vh};
	max-height: ${THEME.height.v80vh};
	width: ${THEME.percentages.v100p};
	overflow: ${THEME.overflow.auto};
`;
