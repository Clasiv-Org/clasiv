import { 
    ScrollView,
	StyleSheet, 
	Text, 
	View 
} from "react-native";
import {
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Color } from "@/theme/color";
import TopBar from "@/components/tob-bar";

const NotificationScreen = () => {
	const insets = useSafeAreaInsets();

	return (
		<View style={[
			styles.container,
			{
				paddingTop: insets.top,
				paddingBottom: insets.bottom,
			}
		]}>
			<TopBar
                title="Notifications"
            />
			<ScrollView
				style={styles.containerContent}
				contentContainerStyle={styles.containerContentInner}
				showsVerticalScrollIndicator={false}
			>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Color.background,
		paddingHorizontal: 10,
	},
    containerTopBar: {
        height: 50,
        // backgroundColor: "gray",
    },
	titleText: {
		fontFamily: "Sora-ExtraBold",
		fontSize: 32,
		color: Color.primary,
	},
    containerContent: {
        flex: 1,
        // backgroundColor: "white",
    },
	containerContentInner: {
		paddingBottom: 100, // space for floating tab bar
	},
});

export default NotificationScreen;
