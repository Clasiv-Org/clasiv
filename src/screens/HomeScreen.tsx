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
import FootNote from "@/components/footnote";
import TopBar from "@/components/tob-bar";
import { useAuthStore } from "@/store/auth";
import { useNavigation } from "@react-navigation/native";

const isDev = false;

const HomeScreen = () => {
	const insets = useSafeAreaInsets();
	const { user } = useAuthStore();

	return (
		<View style={[
			styles.container,
			{
				paddingTop: insets.top,
				paddingBottom: insets.bottom,
			}
		]}>
			<TopBar title="Clasiv"/>
			<ScrollView 
				style={styles.containerContent}
				contentContainerStyle={styles.containerContentInner}
				showsVerticalScrollIndicator={false}
			>
				<Text style={{fontSize: 24, color: Color.primary}}>
				</Text>
				<FootNote/>
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
        backgroundColor: isDev ? "red" : "transparent",
    },
	titleText: {
		fontFamily: "Sora-ExtraBold",
		fontSize: 32,
		color: Color.primary,
	},
    containerContent: {
        flex: 1,
		overflow: "scroll",
        backgroundColor: isDev ? "white" : "transparent",
	},
	containerContentInner: {
		paddingBottom: 100, 
	},
	containerNav: {
		height: 100,
		paddingHorizontal: 10,
        justifyContent: "center",
		backgroundColor: isDev ? "green" : "transparent",
	},
});

export default HomeScreen;
