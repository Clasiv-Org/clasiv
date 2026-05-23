import { 
	View, 
	StyleSheet,
    Pressable, 
} from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Octicons } from "@react-native-vector-icons/octicons";
import { TabButton } from "@/types/navigation";
import { Color } from "@/theme/color";
import LinearGradient from "react-native-linear-gradient";
import { BlurView } from "@react-native-community/blur";

const tabs: TabButton[] = [
	{ route: "Assignments",		icon: "checklist",	label: "Assignments"    },
	{ route: "Home",			icon: "home-fill",  label: "Home"			},
	{ route: "Notifications",	icon: "inbox-fill", label: "Notifications"	},
];

const BottomTabBar = ({ state, navigation }: BottomTabBarProps) => {
	const insets = useSafeAreaInsets();

	return (
		<View style={[ styles.wrapper, { marginBottom: insets.bottom }]}>
			<BlurView
				blurType="dark"
				blurAmount={5}
				style={StyleSheet.absoluteFill}
			/>
			<View style={styles.row}>
				{tabs.map((tab, index) => {
					const isActive = state.index === index;
					const iconColor = isActive ? Color.primaryWhite : "#999999";
					const iconSize = isActive ? 32 : 24;
					const gradientColors = isActive
						? [Color.primary, Color.primaryDark]
						: ["transparent", "transparent"];
					return (
						<Pressable
							key={tab.route}
							style={({pressed}) => [
								styles.tabButton,
								{
									opacity: pressed ? 0.7 : 1,
                                    transform: [{scale: pressed ? 0.98 : 1}]
									
								}
							]}
							onPress={() => navigation.navigate(tab.route)}
						>
							<LinearGradient
								colors={gradientColors}
								style={styles.gradientFill}
							>
								<Octicons name={tab.icon} size={iconSize} color={iconColor} />
							</LinearGradient>
						</Pressable>
					);
				})}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
    wrapper: {
        height: 60,
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        borderRadius: 30,
        overflow: "hidden",
        elevation: 10,
    },
    row: {
        flex: 1,
        flexDirection: "row",
        borderRadius: 30,
        borderWidth: 3,
		padding: 2,
        borderColor: "#48484888",
        overflow: "hidden",
    },
    tabButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
		borderRadius: 25,
        overflow: "hidden",
    },
    gradientFill: {
        ...StyleSheet.absoluteFill, 
		alignItems: "center",
        justifyContent: "center",
    },
});

export default BottomTabBar;
