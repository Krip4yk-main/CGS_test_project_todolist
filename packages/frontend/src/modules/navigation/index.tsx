import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';
import HomePageContainer from '../home';
import { LoginComponent } from '../common/components/login';
import { ForgotComponent } from '../common/components/forgot';
import { ExampleComponent } from '../common/components/example';
import { RegisterComponent } from '../common/components/register';
import { TodoviewComponent } from '../common/components/todoview';
import { MainPageComponent } from '../common/components/mainpage';
import { HocComponent } from '../common/components/HOC/hoc.component';

export const MainRouter = () => (
	<Router>
		<Switch>
			<Route exact path={APP_KEYS.ROUTER_KEYS.ROOT} component={HomePageContainer} />
			<Route path={APP_KEYS.ROUTER_KEYS.LOGIN} component={LoginComponent} />
			<Route path={APP_KEYS.ROUTER_KEYS.REGISTER} component={RegisterComponent} />
			<Route path={APP_KEYS.ROUTER_KEYS.FORGOT} component={ForgotComponent} />
			<Route path={APP_KEYS.ROUTER_KEYS.MAIN}>
				<HocComponent child={<MainPageComponent />} />
			</Route>
			<Route path={APP_KEYS.ROUTER_KEYS.TODOVIEW} component={TodoviewComponent} />
			<Route component={ExampleComponent} />
		</Switch>
	</Router>
);
