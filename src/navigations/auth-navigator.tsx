import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '@/screens/login';
import Signup from '@/screens/activate';
import type { AuthStackParamList } from '@/types/navigation';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login"  component={Login}  />
            <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
