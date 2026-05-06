import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from "@/navigations/auth-navigator";
import TabNavigator from "@/navigations/tab-navigator";
import type { RootStackParamList } from '@/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const useIsAuthenticated = () => false;

const RootNavigator = () => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
                <Stack.Screen name="Main" component={TabNavigator} />
            ) : (
                <Stack.Screen name="Auth" component={AuthNavigator} />
            )}
        </Stack.Navigator>
    );
};

export default RootNavigator;
