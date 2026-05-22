import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "@/screens/landing";
import LoginScreen from "@/screens/login";
import ActivateScreen from "@/screens/activate";
import OnboardingScreen from "@/screens/onboarding";
import type { AuthStackParamList } from "@/types/navigation";
import { Color } from "@/theme/color";
import EmailVerifyScreen from "@/screens/email-verify";

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
