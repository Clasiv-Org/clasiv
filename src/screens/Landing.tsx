import { 
	Image,
	ImageBackground,
	StyleSheet, 
	Text, 
	View 
} from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";
import {
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AuthStackNavigationProps } from "@/types/navigation";
import { Blobs, Color } from "@/theme/color";
import Button from "@/components/Button";
import GradientBackground from "@/components/gradient-background";
import { useCallback } from "react";

const isDev = false;

const LandingScreen = () => {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation<AuthStackNavigationProps>();
	const opacity = useSharedValue(0);
	const translateX = useSharedValue(40);

	useFocusEffect(
		useCallback(() => {
			opacity.value = withTiming(1, { duration: 250 });
			translateX.value = withTiming(0, { duration: 250 });

			return () => {
				opacity.value = 0;
				translateX.value = 40;
			};
		}, [])
	);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
		transform: [{ translateX: translateX.value }],
	}));

    const handleActivate = () => {
        navigation.navigate("Activation");
    }
    const handleLogin = () => {
        navigation.navigate("Login");
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
				topColor={Color.secondary}
				bottomColor={Color.background}
				blobs={Blobs}
			/>
			<ImageBackground
				source={require("@/assets/images/landing-bg-x1.png")}
				style={styles.containerBackground}
			/>
			<Animated.View style={[{flex: 1}, animatedStyle]} >
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
						colors={[Color.primaryAlt, Color.primaryAltDark]}
						onPress={handleLogin}
					>
						<Text style={styles.buttonText}>Login</Text>
					</Button>
				</View>
				<View style={styles.containerFooter}>
					<Text style={styles.footerText}>v0.0.1b</Text>
				</View>
			</Animated.View>
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
		backgroundColor: isDev ? "red" : "transparent",
	},
	containerContent: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	icon: {
		width: 150,
		height: 150,
        backgroundColor: isDev ? "gray" : "transparent",
	},
	titleText: {
		marginTop: 20,
		fontFamily: "Sora-ExtraBold",
		fontSize: 40,
		lineHeight: 36, 
		color: Color.primary,
		backgroundColor: isDev ? "green" : "transparent",
	},
	taglineText: {
		marginTop: 30,
		fontFamily: "Sora-Bold",
		fontSize: 28,
		textAlign: "center",
		color: Color.primaryWhite,
	},
	containerAction: {
		height: "40%",
		justifyContent: "center",
		alignItems: "center",
		gap: 10, 
		backgroundColor: isDev ? "blue" : "transparent",
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
