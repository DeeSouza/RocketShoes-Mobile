import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './pages/Home';
import Header from './pages/Header';

const Routes = createAppContainer(
	createStackNavigator(
		{
			Home,
		},
		{
			// Custom Header in App
			defaultNavigationOptions: navigation => ({
				header: <Header navigation={navigation} />,
			}),
			// Color App Full
			cardStyle: {
				backgroundColor: '#000000',
			},
		}
	)
);

export default Routes;
