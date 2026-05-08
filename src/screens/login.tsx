import { useEffect, useState } from "react";
import { 
	Image,
	ImageBackground,
	Keyboard,
	KeyboardEvent,
	Platform,
	StyleSheet, 
	Text, 
	TouchableWithoutFeedback,
	View 
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from "@/types/navigation";
import { Blobs, Color } from "@/theme/color";
import Button from "@/components/button";
import GradientBackground from "@/components/gradient-background";
import InputBar from "@/components/input-bar";
import { withOpacity } from "@/utils/color";

type Nav = NativeStackNavigationProp<AuthStackParamList>

const useKeyboardHeight = () => {
	const [keyboardHeight, setKeyboardHeight] = useState(0);

	useEffect(() => {
		const show = Keyboard.addListener("keyboardDidShow", (e: KeyboardEvent) => {
			setKeyboardHeight(e.endCoordinates.height);
		});
		const hide = Keyboard.addListener("keyboardDidHide", () => {
			setKeyboardHeight(0);
		});
		return () => {
			show.remove();
			hide.remove();
		};
	}, []);

	return keyboardHeight;
};

const LoginScreen = () => {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation<Nav>();
	const keyboardHeight = useKeyboardHeight();
	const [userCred, setUserCred] = useState("");
	const [password, setPassword] = useState("");

	const handleBack = () => navigation.goBack();
	const handleActivate = () => navigation.navigate("Activate");
	const handleLogin = () => console.log("Login");

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={[
				styles.container,
				{
					paddingTop: insets.top,
					paddingBottom: Platform.OS === "android"
						? keyboardHeight > 0 ? 0 : insets.bottom
						: insets.bottom,
				}
			]}>
				<GradientBackground
					topColor="#0B1F3A"
					bottomColor={Color.background}
					blobs={Blobs}
				/>
				<ImageBackground
					source={require("@/assets/images/landing-bg-x1.png")}
					style={styles.containerBackground}
				/>
				<View style={{
					flex: 1,
					marginBottom: Platform.OS === "android" ? keyboardHeight : 0
				}}>

					<View style={styles.containerContent}>
						<Image 
							source={require("@/assets/images/icon-bgless-nopadding-x0.5.png")} 
							style={styles.icon}
						/>
						<Text style={styles.titleText}>Log back into your account</Text>
					</View>
					<View style={styles.containerAction}>
						<View style={styles.containerInput}>
							<InputBar
								value={userCred}
								onChangeText={(text) => setUserCred(text.toLowerCase().trim())}
								style={styles.inputBar}
								placeholderTextColor={withOpacity(Color.primaryWhite, 0.5)}
								colors={[Color.tertiary, Color.tertiaryDark]}
								start={{ x: 0.5, y: 0 }}
								end={{ x: 0.5, y: 1 }}
								autoCapitalize="none"
								autoCorrect={false}
								placeholder="Username or Email Address"
							/>
							<InputBar
								value={password}
								onChangeText={setPassword}
								style={styles.inputBar}
								placeholderTextColor={withOpacity(Color.primaryWhite, 0.5)}
								colors={[Color.tertiary, Color.tertiaryDark]}
								start={{ x: 0.5, y: 0 }}
								end={{ x: 0.5, y: 1 }}
								autoCapitalize="none"
								autoCorrect={false}
								placeholder="Password"
								textContentType="password"
							/>
						</View>
						<Button
							style={styles.button}
							gradientStyle={styles.buttonGradient}
							colors={[Color.primary, Color.primaryDark]}
							onPress={handleLogin}
						>
							<Text style={styles.buttonText}>Login</Text>
						</Button>
					</View>
					<View style={styles.containerFooter}>
						<Text style={styles.footerText}>v0.0.1b</Text>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
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
	},
	containerContent: {
		height: "40%",
		justifyContent: "flex-end",
		alignItems: "center",
		paddingTop: 60,
	},
	icon: {
		width: 100,
		height: 100,
	},
	titleText: {
		marginTop: 20,
		fontFamily: "Sora-ExtraBold",
		fontSize: 32,
		textAlign: "center",
		color: Color.primaryWhite,
	},
	containerAction: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 30,
	},
	containerInput: {
		gap: 15,
	},
	inputBar: {
		width: 300,
		height: 60,
		borderRadius: 30,
	},
	button: {
		width: 300,
		height: 60,
		borderRadius: 30,
	},
	buttonGradient: {
		paddingBottom: 5,
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

export default LoginScreen;
