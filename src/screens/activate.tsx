import { 
	useCallback, 
	useEffect, 
	useState 
} from "react";
import { 
	Image,
	ImageBackground,
	Keyboard,
	KeyboardEvent,
	Platform,
	Pressable,
	StyleSheet, 
	Text, 
	TouchableWithoutFeedback,
	View 
} from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { 
	CommonActions, 
	useFocusEffect, 
	useNavigation 
} from "@react-navigation/native";
import { AuthStackNavigationProps } from "@/types/navigation";
import { Blobs, Color } from "@/theme/color";
import Button from "@/components/button";
import GradientBackground from "@/components/gradient-background";
import InputBar from "@/components/input-bar";
import { withOpacity } from "@/utils/color";
import { Octicons } from "@react-native-vector-icons/octicons";

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

const isDev = false;

const ActivateScreen = () => {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation<AuthStackNavigationProps>();
	const keyboardHeight = useKeyboardHeight();
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

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

	const handleBack = () => navigation.goBack();

	const handleLogin = () => {
		const state = navigation.getState();
		const currentIndex = state.index;

		if (currentIndex === 1) {
			navigation.dispatch(
				CommonActions.reset({
					index: 1,
					routes: [
						{ name: 'Landing' },
						{ name: 'Login' },
					],
				})
			);
		} 
		else navigation.pop();
	};

	const handleActivate = async () => {
		console.log("activate");
	};

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
					topColor={Color.secondary}
					bottomColor={Color.background}
					blobs={Blobs}
				/>
				<ImageBackground
					source={require("@/assets/images/landing-bg-x1.png")}
					style={StyleSheet.absoluteFill}
				/>
				<Animated.View style={[
					{ 
						flex: 1, 
						marginBottom: Platform.OS === "android" ? keyboardHeight : 0 
					}, 
					animatedStyle
				]}>
					<View style={styles.containerTopBar}>
						<Pressable 
							style={styles.backButton}
							onPress={handleBack}
							android_ripple={{ 
								borderless: true,
								radius: 20,
								color: Color.tertiaryDark 
							}}
						>
							<Octicons name="chevron-left" size={36} color={Color.primary} />
						</Pressable>
					</View>
					<View style={styles.containerContent}>
						<Image 
							source={require("@/assets/images/icon-bgless-nopadding-x0.5.png")} 
							style={styles.icon}
						/>
						<Text style={styles.titleText}>
							Get started by Activating your account
						</Text>
					</View>
					<View style={styles.containerAction}>
						<View style={styles.containerInput}>
							<InputBar
								value={userName}
								onChangeText={(text) => 
									setUserName(text.toLowerCase().trim())
								}
								style={styles.inputBar}
								placeholderTextColor={withOpacity(Color.primaryWhite, 0.5)}
								colors={[Color.tertiary, Color.tertiaryDark]}
								start={{ x: 0.5, y: 0 }}
								end={{ x: 0.5, y: 1 }}
								autoCapitalize="none"
								autoCorrect={false}
								placeholder="Username"
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
						<View style={styles.containerButton}>
							<Button
								style={styles.button}
								gradientStyle={styles.buttonGradient}
								colors={[Color.primary, Color.primaryDark]}
								onPress={handleActivate}
							>
								<Text style={styles.buttonText}>Activate</Text>
							</Button>
							{keyboardHeight === 0 && (
								<Pressable
									style={styles.loginButton}
									onPress={handleLogin}
								>
									<Text style={styles.loginText}>
										Already have an account? Login
									</Text>
								</Pressable>
							)}
						</View>
					</View>
					{keyboardHeight === 0 && (
						<View style={styles.containerFooter}>
							<Text style={styles.footerText}>v0.0.1b</Text>
						</View>
					)}
				</Animated.View>
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
	containerTopBar: {
		height: 50,
		width: 50,
		position: "absolute",
		top: 0,
		left: 0,
		zIndex: 999,
		backgroundColor: isDev ? "yellow" : "transparent",
	},
	backButton: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	containerContent: {
		height: "45%",
		justifyContent: "flex-end",
		alignItems: "center",
		paddingTop: 60,
		backgroundColor: isDev ? "green" : "transparent",
	},
	icon: {
		width: 100,
		height: 100,
	},
	titleText: {
		margin: 20,
		fontFamily: "Sora-ExtraBold",
		fontSize: 28,
		textAlign: "center",
		color: Color.primaryWhite,
		backgroundColor: isDev ? "red" : "transparent",
	},
	containerAction: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		paddingTop: 20,
		gap: 20,
		backgroundColor: isDev ? "red" : "transparent",
	},
	containerInput: {
		gap: 10,
	},
	inputBar: {
		width: 350,
		height: 60,
		borderRadius: 30,
	},
	containerButton: {
		gap: 10,
		backgroundColor: isDev ? "green" : "transparent",
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
	loginButton: {},
	loginText: {
		fontFamily: "Sora-Bold",
		fontSize: 14,
		textAlign: "center",
		color: Color.primaryAlt,
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

export default ActivateScreen;
