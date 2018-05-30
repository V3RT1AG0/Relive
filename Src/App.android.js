// @flow
import axios from "axios";
import { Navigation, NativeEventsReceiver } from "react-native-navigation";
import { registerScreens } from "./Config/Screens";
import { AppState } from "react-native";
import {
	changeStatusToOnline,
	changeStatusToOffline
} from "./Config/StateChangeConfig";

axios.interceptors.request.use(request => {
	console.log("Starting Request", request);
	return request;
});

registerScreens();
require("./Config/Listeners");


const startApp = () => {
	Navigation.startSingleScreenApp({
		screen: {
			label: "One",
			screen: "Splash",
			title: "Screen One",
			icon: require("./Assets/Images/checked.png")
		}
	});
};


/*
const startApp = () => {
    Navigation.startTabBasedApp({
        tabs: [
            {
                label: 'One',
                title: 'Screen One',
                screen: 'Profile',
                icon: require('../Src/Assets/Images/charmander.png'),
            },
            {
                label: 'Two',
                screen: 'Timeline',
                title: 'Screen Two',
                icon: require('../Src/Assets/Images/charmander.png'),
            },
            {
                label: 'Three',
                icon: require('../Src/Assets/Images/charmander.png'),
                screen: 'Profile',
                title: 'Screen Two'
            }
        ]
    });
};
*/



Navigation.isAppLaunched().then(appLaunched => {
	if (appLaunched) {
		startApp(); // App is launched -> show UI
	}
	new NativeEventsReceiver().appLaunched(startApp); // App hasn't been launched yet -> show the UI only when needed.
});

//setUpNewUploadRealmListener();
AppState.addEventListener("change", AppState => {
	if (AppState === "active") {
		//App is in foreground
		changeStatusToOnline();
	} else {
		changeStatusToOffline();
	}
});

/* const RootNavigator = StackNavigator({
	Navigator: {
		screen: Navigation,
		navigationOptions: {
			headerTitle: "Navigator"
		}
	},
	Upload: {
		screen: UploadActivity,
		navigationOptions: {
			headerTitle: "UploadActivity"
		}
	},
	Login: {
		screen: LoginActivity,
		navigationOptions: {
			headerTitle: "LoginActivity"
		}
	},
	Profile: {
		screen: ProfileActivity,
		navigationOptions: {
			headerTitle: "ProfileActivity"
		}
	},
	Timeline: {
		screen: TimelineActivity,
		navigationOptions: {
			headerTitle: "TimelineActivity"
		}
	},
	Gallery: {
		screen: GalleryActivity,
		navigationOptions: {
			headerTitle: "Gallery"
		}
	},
	Share: {
		screen: ShareActivity,
		navigationOptions: {
			headerTitle: "Share"
		}
	}
});
 */
/* const store = configureStore();
console.log("store changed" + store.getState());
store.subscribe(() => {
	console.log("store changed" + store.getState());
}); */

//you need to import React even for stateless functional components
/* const app =import { setUpNewUploadRealmListener } from './Config/Listeners';
 () => (import { AsyncStorage } from 'react-native';

	<Provider store={store}>
		<RootNavigator />
	</Provider>
);

export default app; */
