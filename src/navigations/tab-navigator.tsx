import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabBar from '@components/bottom-tab-bar';
import HomeScreen from '@/screens/HomeScreen';
import AssignmentScreen from '@/screens/AssignmentScreen';
import NotificationScreen from '@/screens/NotificationScreen';
import type { TabParamList } from '@/types/navigation';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
    return (
        <Tab.Navigator
			initialRouteName="Home"
            tabBar={(props) => <BottomTabBar {...props} />}
            screenOptions={{ 
				headerShown: false, 
				tabBarStyle: { position: 'absolute' },
			}}
        >
            <Tab.Screen 
				name="Assignments" 
				component={AssignmentScreen} 
			/>
            <Tab.Screen 
				name="Home" 
				component={HomeScreen} 
			/>
            <Tab.Screen 
				name="Announcements" 
				component={NotificationScreen} 
			/>
        </Tab.Navigator>
    );
};

export default TabNavigator;
