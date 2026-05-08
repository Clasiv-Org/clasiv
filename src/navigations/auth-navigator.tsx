import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '@/screens/landing';
import Login from '@/screens/login';
import Signup from '@/screens/activate';
import type { AuthStackParamList } from '@/types/navigation';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen 
				name="Login"  
				component={Login} 
				options={{ keyboardHandlingEnabled: true }} 
			/>
            <Stack.Screen name="Activate" component={Signup} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
