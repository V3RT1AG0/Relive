// @flow
import { StackNavigator } from "react-navigation";
import MainActivity from "./Activities/MainActivity";
import configureStore from "./Config/ReduxStoreConfig";
import { Provider } from "react-redux";
import React from "react";
import UploadActivity from "./Activities/UploadActivity";

const RootNavigator = StackNavigator({
	Upload: {
		screen: UploadActivity,
		navigationOptions: {
			headerTitle: "UploadActivity"
		}
	},
	Home: {
		screen: MainActivity,
		navigationOptions: {
			headerTitle: "MainActivity"
		}
	}
});

const store = configureStore();
console.log("store changed" + store.getState());
store.subscribe(() => {
	console.log("store changed" + store.getState());
});

//you need to import React even for stateless functional components
const app = () => (
	<Provider store={store}>
		<RootNavigator />
	</Provider>
);

export default app;
