import { 
	StatusBar, 
	useColorScheme, 
} from 'react-native';
import {
	SafeAreaProvider,
} from 'react-native-safe-area-context';
import Toast from "@/components/Toast";
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from "@/navigations/root-navigation";

const App = () => {
	const isDarkMode = useColorScheme() === 'dark';

	return (
		<SafeAreaProvider>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
			<NavigationContainer>
				<RootNavigator />
			</NavigationContainer>
			<Toast/>
		</SafeAreaProvider>
	);
}


export default App;
