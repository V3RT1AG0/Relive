// @flow
import { StackNavigator } from "react-navigation";
import MainActivity from "./Activities/MainActivity";
import configureStore from "./Config/ReduxStoreConfig";
import { Provider } from "react-redux";
import React from "react";

const RootNavigator = StackNavigator({
	Home: {
		screen: MainActivity,
		navigationOptions: {
			headerTitle: "Timeline"
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
