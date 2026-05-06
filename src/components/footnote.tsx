import { 
	StyleSheet, 
	Text, 
	View, 
} from "react-native";
import { Color } from "@/theme/color";

const FootNote = () => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>
					Clasiv
				</Text>
				<Text style={styles.versionText}>
					v0.0.1b
				</Text>
			</View>
			<View style={styles.content}>
				<Text style={styles.contentText}>
					Transform Education Classively
				</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 30,
		paddingTop: 80,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
	},
	headerText: {
		fontFamily: "Sora-ExtraBold",
		fontSize: 48,
		lineHeight: 40,
		color: Color.tertiary,
	},
	versionText: {
		height: "100%",
		fontFamily: "Sora-ExtraBold",
		fontSize: 28,
		lineHeight: 24,
		textAlignVertical: "bottom",
		color: Color.primaryDark,
	},
	content: {
		marginTop: 10,
	},
	contentText: {
		fontFamily: "Sora-Bold",
		fontSize: 30,
		color: Color.tertiaryDark
	},
});

export default FootNote;
