import { 
	Image,
	ImageBackground,
	StyleSheet, 
	Text, 
	View 
} from "react-native";
import {
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from "@/types/navigation";
import { Color } from "@/theme/color";
import Button from "@/components/button";
import GradientBackground from "@/components/gradient-background";

type Nav =	NativeStackNavigationProp<AuthStackParamList>

const LandingScreen = () => {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation<Nav>();

    const handleActivate = () => {
        navigation.navigate("Activate");
    }
    const handleLogin = () => {
        navigation.push("Login");
    }

	return (
		<View style={[
			styles.container,
			{
				paddingTop: insets.top,
				paddingBottom: insets.bottom,
			}
		]}>
			<GradientBackground
				topColor="#0B1F3A"
				bottomColor={Color.background}
				blobs={[
					{ x: 20, y: -40, r: 50, color: "black", opacity: 0.5 },
					{ x: 10, y: 60, r: 40, color: "#1E3A8A", opacity: 0.25 },
					{ x: 85, y: -20, r: 45, color: Color.primaryDark, opacity: 0.3 },
					{ x: 80, y: 150, r: 70, color: "black", opacity: 0.7 },
				]}
			/>
			<ImageBackground
				source={require("@/assets/images/landing-bg-x1.png")}
				style={styles.containerBackground}
			/>
			<View style={styles.containerContent}>
				<Image 
					source={require("@/assets/images/icon-bgless-nopadding-x0.5.png")} 
					style={styles.icon}
				/>
				<Text style={styles.titleText}>Clasiv</Text>
				<Text style={styles.taglineText}>Manage your entire classroom in one place</Text>
			</View>
			<View style={styles.containerAction}>
				<Button
					style={styles.button}
					gradientStyle={styles.buttonGradient}
					colors={[Color.primary, Color.primaryDark]}
					onPress={handleActivate}
				>
					<Text style={styles.buttonText}>Activate</Text>
				</Button>
				<Text style={styles.separator}>or</Text>
				<Button
					style={styles.button}
					gradientStyle={styles.buttonGradient}
					colors={[Color.primaryWhite, Color.tertiary]}
					onPress={handleLogin}
				>
					<Text style={styles.buttonText}>Login</Text>
				</Button>
			</View>
			<View style={styles.containerFooter}>
				<Text style={styles.footerText}>v0.0.1b</Text>
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
	containerBackground: {
		...StyleSheet.absoluteFill,
		// backgroundColor: Color.primary,
	},
	containerContent: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	icon: {
		width: 180,
		height: 180,
		// backgroundColor: Color.tertiary
	},
	titleText: {
		marginTop: 20,
		fontFamily: "Sora-ExtraBold",
		fontSize: 40,
		lineHeight: 36, 
		color: Color.primary,
		// backgroundColor: Color.primaryWhite
	},
	taglineText: {
		marginTop: 30,
		fontFamily: "Sora-Bold",
		fontSize: 24,
		textAlign: "center",
		color: Color.primaryWhite,
	},
	containerAction: {
		height: "40%",
		justifyContent: "center",
		alignItems: "center",
		gap: 10, 
		// backgroundColor: Color.primaryDark
	},
	separator: {
		fontFamily: "Sora-Bold",
		fontSize: 24,
		textAlign: "center",
		textTransform: "uppercase",
		color: Color.tertiary
	},
	button: {
		width: 300,
		height: 60,
		borderRadius: 30,
	},
	buttonGradient: {
		paddingBottom: 5
	},
	buttonText: {
		fontFamily: "Sora-Bold",
		fontSize: 28,
		textAlignVertical: "top",
		color: Color.primaryWhite,
	},
	containerFooter: {
		height: 50,
		justifyContent: "flex-end",
		alignItems: "flex-end",
	},
	footerText: {
		fontFamily: "Sora-Bold",
		fontSize: 16,
		textAlign: "center",
		color: Color.tertiary,
	},
});

export default LandingScreen;
