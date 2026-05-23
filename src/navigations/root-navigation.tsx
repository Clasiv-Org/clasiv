import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "@/navigations/auth-navigator";
import AppNavigator from "@/navigations/app-navigator";
import type { RootStackParamList } from "@/types/navigation";
import { useIsLoggedIn } from "@/store/auth";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    const isAuthenticated = useIsLoggedIn();

    return (
        <Stack.Navigator 
			screenOptions={{ 
				headerShown: false,
				animation: "none",
			}}
		>
            {isAuthenticated ? (
				<Stack.Screen name="Main" component={AppNavigator} />
            ) : (
                <Stack.Screen name="Auth" component={AuthNavigator} />
            )}
        </Stack.Navigator>
    );
};

export default RootNavigator;
