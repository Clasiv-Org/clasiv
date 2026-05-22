import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "@/screens/LandingScreen";
import LoginScreen from "@/screens/LoginScreen";
import ActivateScreen from "@/screens/ActivateScreen";
import OnboardingScreen from "@/screens/OnboardingScreen";
import EmailVerifyScreen from "@/screens/EmailVerifyScreen";
import type { AuthStackParamList } from "@/types/navigation";
import { Color } from "@/theme/color";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
    return (
        <Stack.Navigator 
			initialRouteName="Landing" 
			screenOptions={{ 
				headerShown: false,
				contentStyle: { 
					backgroundColor: Color.background 
				},
				animation: "none",
			}}
		>
			<Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen 
				name="Login"  
				component={LoginScreen} 
				options={{ keyboardHandlingEnabled: true }} 
			/>
            <Stack.Screen 
				name="Activate" 
				component={ActivateScreen} 
                options={{ keyboardHandlingEnabled: true }}
			/>
			<Stack.Screen 
				name="Onboarding" 
				component={OnboardingScreen} 
				options={{ keyboardHandlingEnabled: true }}
			/>
			<Stack.Screen 
				name="EmailVerify" 
				component={EmailVerifyScreen} 
				options={{ keyboardHandlingEnabled: true }}
			/>
        </Stack.Navigator>
    );
};

export default AuthNavigator;
