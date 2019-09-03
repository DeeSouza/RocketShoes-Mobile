import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import Routes from './routes';
import './config/ReactotronConfig';
import store from './store';
import NavigationService from './services/navigation';

function App() {
	return (
		<Provider store={store}>
			<StatusBar barStyle="light-content" />
			<Routes
				ref={navigatorRef =>
					NavigationService.setNavigator(navigatorRef)
				}
			/>
		</Provider>
	);
}

export default App;
