import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabBar from '@components/bottom-tab-bar';
import HomeScreen from '@/screens/home';
import AssignmentsScreen from '@/screens/assignments';
import AnnouncementsScreen from '@/screens/announcements';
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
            <Tab.Screen name="Assignments"  component={AssignmentsScreen}  />
            <Tab.Screen name="Home"    component={HomeScreen}    />
            <Tab.Screen name="Announcements" component={AnnouncementsScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
