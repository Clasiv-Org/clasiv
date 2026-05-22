import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "@/navigations/tab-navigator";
import ProfileScreen from "@/screens/ProfileScreen";
import type { AppStackParamList } from "@/types/navigation";
import { Color } from "@/theme/color";

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
    return (
        <Stack.Navigator 
			initialRouteName="Tab" 
			screenOptions={{ 
				headerShown: false,
				contentStyle: { 
					backgroundColor: Color.background 
				},
				animation: "none",
			}}
		>
			<Stack.Screen 
				name="Tab" 
				component={TabNavigator} 
			/>
			<Stack.Screen 
				name="Profile" 
				component={ProfileScreen} 
			/>
		</Stack.Navigator>
    );
};

export default AppNavigator;
