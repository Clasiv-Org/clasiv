import { 
	StatusBar, 
	StyleSheet, 
	Text, 
	useColorScheme, 
	View, 
} from 'react-native';
import {
	SafeAreaProvider,
} from 'react-native-safe-area-context';
import HomeScreen from '@/screens/home';
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
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default App;
