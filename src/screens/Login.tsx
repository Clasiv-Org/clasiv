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
import { LoginSchema } from "@/types/auth";
import { Octicons } from "@react-native-vector-icons/octicons";
import { useAuthStore } from "@/store/auth";
import { useToastStore } from "@/store/toast";
import { InputValueProps } from "@/types/input-bar";

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

const LoginScreen = () => {
	const { loading, login } = useAuthStore();
	const insets = useSafeAreaInsets();
	const navigation = useNavigation<AuthStackNavigationProps>();
	const keyboardHeight = useKeyboardHeight();
	const [identifier, setIdentifier] = useState<InputValueProps>({value: ""});
	const [password, setPassword] = useState<InputValueProps>({value: ""});

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
	const handleActivate = () => {
		const state = navigation.getState();
		const currentIndex = state.index;

		if (currentIndex > 0 && state.routes[currentIndex - 1].name === "Landing") {
			navigation.push("Activation");
		} 
		else navigation.pop();
	};
	const handleLogin = async () => {
		if(identifier.value === "" || password.value === ""){
			if(identifier.value === ""){
				setIdentifier({
					value: "",
					color: withOpacity(Color.primary, 0.8),
					placeholder: "Username or Email is required"
				});
			}
			if(password.value === ""){
				setPassword({
					value: "",
					color: withOpacity(Color.primary, 0.8),
					placeholder: "Password is required"
				});
			}
			useToastStore.getState().show({
                type: "warning",
                message: "Credentials are required",
			});
            return;
		}

		const data = LoginSchema.parse({
			identifier: identifier.value,
			password: password.value
		});
		await login(data);
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
						<Text style={styles.titleText}>Log back into your account</Text>
					</View>
					<View style={styles.containerAction}>
						<View style={styles.containerInput}>
							<InputBar
								value={identifier.value}
								onChangeText={(text) => 
									setIdentifier({
										value: text.toLowerCase().trim(),
                                        color: null,
										placeholder: null
                                    })
								}
								style={styles.inputBar}
								placeholderTextColor={identifier.color ?? withOpacity(Color.primaryWhite, 0.5)}
								colors={[Color.tertiary, Color.tertiaryDark]}
								start={{ x: 0.5, y: 0 }}
								end={{ x: 0.5, y: 1 }}
								autoCapitalize="none"
								autoCorrect={false}
								placeholder={identifier.placeholder ?? "Username or Email"}
                                textContentType="username"
                                autoComplete="username"
							/>
							<InputBar
								value={password.value}
								onChangeText={(text) => 
									setPassword({
                                        value: text,
                                        color: null,
                                        placeholder: null
									})
								}
								style={styles.inputBar}
								placeholderTextColor={password.color ?? withOpacity(Color.primaryWhite, 0.5)}
								colors={[Color.tertiary, Color.tertiaryDark]}
								start={{ x: 0.5, y: 0 }}
								end={{ x: 0.5, y: 1 }}
								autoCapitalize="none"
								autoCorrect={false}
								placeholder={password.placeholder ?? "Password"}
                                secureTextEntry
								textContentType="password"
                                autoComplete="password"
							/>
						</View>
						<View style={styles.containerButton}>
							<Button
								style={styles.button}
								colors={[Color.primary, Color.primaryDark]}
								onPress={handleLogin}
							>
								<View style={styles.buttonIcon}>
									<View style={styles.buttonIconInner}>
										{ loading &&
											<ActivityIndicator 
												size="large"
												color={Color.primaryWhite}
											/>
										}
									</View>
									<Text style={styles.buttonText}>Login</Text>
									<View style={styles.buttonIconInner}/>
								</View>
							</Button>
							{ keyboardHeight === 0 && <Pressable
								style={styles.activateButton}
								onPress={handleActivate}
							>
								<Text style={styles.activateText}>
									Account not not found? Activate
								</Text>
							</Pressable>
							}
						</View>
					</View>
					{ keyboardHeight === 0 &&
						<View style={styles.containerFooter}>
							<Text style={styles.footerText}>v0.0.1b</Text>
						</View>
					}
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
		backgroundColor: isDev ? "red" : "transparent"
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
		backgroundColor: isDev ? "green" : "transparent",
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
		textAlignVertical: "top",
		color: Color.primaryWhite,
		backgroundColor: isDev ? "red" : "transparent",
	},
	activateButton: {
		backgroundColor: isDev ? "red" : "taransparent",
	},
	activateText: {
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

export default LoginScreen;
