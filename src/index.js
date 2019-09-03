import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import Routes from './routes';
import './config/ReactotronConfig';
import store from './store';

function App() {
	return (
		<Provider store={store}>
			<StatusBar barStyle="light-content" />
			<Routes />
		</Provider>
	);
}

export default App;
