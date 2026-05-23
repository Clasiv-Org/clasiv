import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "@/screens/LandingScreen";
import LoginScreen from "@/screens/LoginScreen";
import ActivationScreen from "@/screens/Activation";
import ActivationOnboardingScreen from "@/screens/ActivationOnboarding";
import ActivationEmailVerifyScreen from "@/screens/ActivationEmailVerify";
import ActivationSetPasswordScreen from "@/screens/ActivationSetPassword";
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
			<Stack.Screen 
				name="Landing" 
				component={LandingScreen} 
			/>
            <Stack.Screen 
				name="Login"  
				component={LoginScreen} 
				options={{ keyboardHandlingEnabled: true }} 
			/>
            <Stack.Screen 
				name="Activation" 
				component={ActivationScreen} 
                options={{ keyboardHandlingEnabled: true }}
			/>
			<Stack.Screen 
				name="ActivationOnboarding" 
				component={ActivationOnboardingScreen} 
				options={{ keyboardHandlingEnabled: true }}
			/>
			<Stack.Screen 
				name="ActivationEmailVerify" 
				component={ActivationEmailVerifyScreen} 
				options={{ keyboardHandlingEnabled: true }}
			/>
			<Stack.Screen 
				name="ActivationSetPassword" 
				component={ActivationSetPasswordScreen} 
				options={{ keyboardHandlingEnabled: true }}
			/>
        </Stack.Navigator>
    );
};

export default AuthNavigator;
