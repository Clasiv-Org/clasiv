import { 
	useCallback, 
	useEffect, 
	useState 
} from "react";
import { 
	ActivityIndicator,
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
	useFocusEffect, 
	useNavigation 
} from "@react-navigation/native";
import { AuthStackNavigationProps } from "@/types/navigation";
import { Blobs, Color } from "@/theme/color";
import Button from "@/components/Button";
import GradientBackground from "@/components/gradient-background";
import InputBar from "@/components/InputBar";
import { withOpacity } from "@/utils/color";
import { Octicons } from "@react-native-vector-icons/octicons";
import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";
import { useAuthStore } from "@/store/auth";
import { capitalizeWords } from "@/utils/string";

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

const ActivationSetPasswordScreen = () => {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation<AuthStackNavigationProps>();
	const keyboardHeight = useKeyboardHeight();
	const { loading, activationComplete } = useAuthStore();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

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

	useEffect(() => {
		if (password !== confirmPassword) {
			console.log("Password Mismatch");
		}
		else console.log("Password Match");
	}, [confirmPassword])

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
		transform: [{ translateX: translateX.value }],
	}));

	const handleBack = () => navigation.goBack();

	const handleFormSubmisson = async () => {
		if(password === "" || confirmPassword === "") {
			return;
		}
		await activationComplete(password);
		console.log(useAuthStore.getState().message);
		console.log(useAuthStore.getState().statusCode);
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
					<View style={[
						styles.containerContent,
						{ height: keyboardHeight > 0 ? "auto" : "40%" }
					]}>
						{ keyboardHeight === 0 && 
							<FontAwesome6 name="id-card" size={100} color={Color.primaryAlt} />
						}
						<Text style={styles.titleText}>
							{`Set up your account!`}
						</Text>
					</View>
					<View style={styles.containerAction}>
						<View style={styles.containerInput}>
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
								placeholder="New Password"
								secureTextEntry
								textContentType="newPassword"
								autoComplete="new-password"
							/>
							<InputBar
								value={confirmPassword}
								onChangeText={setConfirmPassword}
								style={styles.inputBar}
								placeholderTextColor={withOpacity(Color.primaryWhite, 0.5)}
								colors={[Color.tertiary, Color.tertiaryDark]}
								start={{ x: 0.5, y: 0 }}
								end={{ x: 0.5, y: 1 }}
								autoCapitalize="none"
								autoCorrect={false}
								placeholder="Comfirm New Password"
								secureTextEntry
								textContentType="newPassword"
								autoComplete="new-password"
							/>
						</View>
						<View style={styles.containerButton}>
							{keyboardHeight === 0 && (
								<Button
									style={styles.button}
									colors={[Color.primary, Color.primaryDark]}
									onPress={handleFormSubmisson}
								>
									<View style={styles.buttonIcon}>
										<View style={styles.buttonIconInner}>
											{ loading &&
												<ActivityIndicator 
													size="large"
													color={Color.primaryWhite}
												/>}
										</View>
										<Text style={styles.buttonText}>Activate</Text>
										<View style={styles.buttonIconInner}/>
									</View>

								</Button>
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
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 50,
		backgroundColor: isDev ? "green" : "transparent",
	},
	icon: {
		width: 100,
		height: 100,
	},
	titleText: {
		marginHorizontal: 20,
		fontFamily: "Sora-ExtraBold",
		fontSize: 28,
		textAlign: "center",
		color: Color.primaryWhite,
		backgroundColor: isDev ? "red" : "transparent",
	},
	containerAction: {
		flex: 1,
		flexGrow: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		paddingTop: 50,
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
	buttonIcon: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
		backgroundColor: isDev ? "green" : "transparent",
	},
	buttonIconInner: {
		flex: 1,
		height: "100%",
		backgroundColor: isDev ? "yellow" : "transparent",
		alignItems: "flex-end",
		justifyContent: "center",
	},
	buttonText: {
		fontFamily: "Sora-Bold",
		fontSize: 28,
		lineHeight: 32,
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

export default ActivationSetPasswordScreen;
