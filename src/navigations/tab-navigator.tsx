import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabBar from '@components/bottom-tab-bar';
import HomeScreen from '@/screens/home';
import AssignmentScreen from '@/screens/assignment';
import AnnouncementScreen from '@/screens/announcement';
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
            <Tab.Screen name="Assignment"  component={AssignmentScreen}  />
            <Tab.Screen name="Home"    component={HomeScreen}    />
            <Tab.Screen name="Announcement" component={AnnouncementScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
