import React, { 
    useEffect,
	useState, 
	forwardRef, 
} from "react";
import { 
	StyleSheet, 
	View, 
	TextInput, 
	Pressable,
} from "react-native"
import Animated, { 
	useAnimatedStyle, 
	useSharedValue, 
	withTiming 
} from "react-native-reanimated";
import { 
	Eye, 
	EyeClosed, 
	X 
} from "lucide-react-native";
import LinearGradient from "react-native-linear-gradient";
import { InputBarProps } from "@/types/input-bar";
import { Color } from "@/theme/color";
import { withOpacity } from "@/utils/color";


const InputBar = forwardRef<TextInput, InputBarProps>(({
	children,
	colors,
	locations,
	start,
	end,
	value,
	onChangeText,
	placeholder,
	placeholderTextColor,
	secureTextEntry,
	textContentType,
    autoComplete,
	isClearButtonEnabled = false,
	placeholderLabel,
	style,
	textStyle,
	placeholderLabelstyle,
	...rest
}: InputBarProps, ref ) => {
	const [secureText, setSecureText] = useState<boolean>(true);
	const [valueLocal, setValueLocal] = useState<string>("");
	const isActive = value 
		? value.length > 0 
		: valueLocal.length > 0;
	const isPassword = secureTextEntry === true;

	const opacity = useSharedValue(0.5);
	const baseOpacity = useSharedValue(0);
    const translateY = useSharedValue(27);
	const scale = useSharedValue(1.14);

	useEffect(() => {
		const time = 250;

		if (isActive) {
			opacity.value = withTiming(1, { duration: time });
			scale.value = withTiming(1, { duration: time });
			translateY.value = withTiming(0, { duration: time });

			baseOpacity.value = withTiming(1, { duration: time});
		}
		else {
			opacity.value = withTiming(0.5, { duration: time });
			scale.value = withTiming(1.14, { duration: time });
			translateY.value = withTiming(27, { duration: time });

			baseOpacity.value = withTiming(0, { duration: time });
		}
	}, [isActive]);

    const animatedLableStyle = useAnimatedStyle(() => ({
        opacity: baseOpacity.value,
    }));
	const animatedLableTextStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
		transform: [
			{ scale: scale.value },
			{ translateY: translateY.value }, 
		],
    }));

	return (
		<LinearGradient
			colors={colors ?? [Color.primary, Color.primaryDark]}
			start={start ?? {x: 0.5, y: 0}}
			end={end ?? {x: 0.5, y: 1}}
            locations={locations ?? [0, 1]}
			style={[
				styles.gradient,
				style
			]}
		>
			<Animated.View style={[
				styles.label, 
				{ backgroundColor: String(colors[0]) ?? Color.primary },
				animatedLableStyle
			]}>
				<Animated.Text style={[
					styles.labelText, 
					placeholderLabelstyle,
					animatedLableTextStyle
				]}>
					{placeholderLabel ?? placeholder ?? "Input..."}
				</Animated.Text>
			</Animated.View>
			<View style={styles.container}>
				{children}
				<TextInput
                    ref={ref}
					value={value ?? valueLocal}
					onChangeText={onChangeText ?? setValueLocal}
					placeholder={placeholder ?? "Input..."}
					placeholderTextColor={placeholderTextColor ?? Color.tertiary}
					secureTextEntry={isPassword ? secureText : false} 
					textContentType={textContentType}
					autoComplete={autoComplete}
					style={[
						styles.searchBarInput, 
						textStyle,
						{ 
                            paddingLeft: children ? 5 : 20,
							paddingRight: (isClearButtonEnabled || isPassword) ? 5 : 20
						},
					]}
					{...rest}
				/>
				{isPassword && isActive &&
					<Pressable 
						onPress={() => setSecureText(!secureText)} 
						style={styles.button}
						android_ripple={{ 
							color: Color.tertiaryDark,
							borderless: true,
							radius: 20
						}}
					>
						{secureText ? (
							<EyeClosed size={24} color={Color.primaryAlt} />
						):(
							<Eye size={24} color={Color.primaryAlt} />
						)}
					</Pressable>
				}
				{isClearButtonEnabled && isActive && 
					<Pressable 
						onPress={() => {
							setValueLocal("");
							onChangeText?.("");
						}}
						style={styles.button}
						android_ripple={{ 
							color: Color.tertiaryDark,
							borderless: true,
							radius: 20
						}}
					>
						<X size={28} color={Color.primaryAlt} />
					</Pressable>
				}
			</View>
		</LinearGradient>
	);
});

const styles = StyleSheet.create({
	gradient: {
		width: "100%",
		height: 50,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 50,
		padding: 3,
	},
    label: {
        position: "absolute",
        left: 20,
		top: -6.5,
        height: 18,
        borderRadius: 15,
		paddingHorizontal: 10,
        textAlign: "center",
        textAlignVertical: "center",
		backgroundColor: Color.tertiary,
		zIndex: 1
    },
	labelText: {
        fontSize: 14,
		lineHeight: 16,
        fontFamily: "Sora-Medium",
        color: withOpacity(Color.primaryWhite, 0.8),
	},
	container: {
		width: "100%",
		height: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		borderRadius: 50,
		paddingRight: 5,
		overflow: "hidden",
		backgroundColor: withOpacity(Color.background, 0.8),
	},
	searchBarInput: {
		flex: 1,
		height: "100%",
		fontSize: 16,
		fontFamily: "Sora-Medium",
		color: Color.primaryWhite,
	},
	button: {
		height: "70%",
		aspectRatio: 1,
		borderRadius: 50,
		justifyContent: "center",
        alignItems: "center",
	},
	buttonIcon: {  
		height: "100%",
		aspectRatio: 1,
		borderRadius: 50,
		textAlign: "center",
		textAlignVertical: "center",
	},
});

export default InputBar;
