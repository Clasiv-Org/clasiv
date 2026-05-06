import { 
	StyleSheet, 
	Text, 
	View 
} from "react-native";
import {
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Color } from "@/theme/color";

const HomeScreen = () => {
	const insets = useSafeAreaInsets();

	return (
		<View style={[
			styles.container,
			{
				paddingTop: insets.top,
				paddingBottom: insets.bottom,
			}
		]}>
			<View style={styles.containerTopBar}>
				<Text style={styles.titleText}>
					Activate
				</Text>
			</View>
			<View style={styles.containerContent}>
                <Text style={styles.titleText}>Content</Text>
			</View>
			<View style={styles.containerNav}>
			</View>
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
	containerNav: {
		height: 100,
		paddingHorizontal: 10,
        justifyContent: "center",
		// backgroundColor: "red",
	},
});

export default HomeScreen;

