import { useEffect } from "react";
import { 
	StyleSheet, 
	Text, 
	View 
} from "react-native";
import Animated, { 
	useSharedValue, 
	useAnimatedStyle, 
	withSpring,
	withTiming,
	runOnJS,
} from "react-native-reanimated";
import { BlurView } from "@react-native-community/blur";
import { 
	Info, 
	CircleX, 
	CircleAlert, 
	CircleCheck, 
	LucideIcon 
} from "lucide-react-native";
import { ToastType } from "@/types/toast";
import { useToastStore } from "@/store/toast";
import { Color } from "@/theme/color";
import { withOpacity } from "@/utils/color";
import { 
	capitalizeFirstLetter, 
	capitalizeWords 
} from "@/utils/string";

const mapColor = {
	"success":		Color.success,
	"error":		Color.error,
	"warning":		Color.warning,
	"information":	Color.information,
};

const mapIcon: Record<ToastType, LucideIcon> = {
	"success":		CircleCheck,
	"error":		CircleX,
	"warning":		CircleAlert,
	"information":	Info,
};

const Icon = ({ type }: { type: ToastType }) => {
	const Icon = mapIcon[type];
	const color = mapColor[type];
	return(
		<Icon size={64} color={color} style={{margin: -5}}/>
	);
}

const Toast = () => {
	const { visible, title, message, type, duration, position, hide } = useToastStore();
	const color = mapColor[type];
	const translateY = useSharedValue(position === "bottom" ? 100 : -100);
	const opacity = useSharedValue(0);

	useEffect(() => {
		if(visible) {
			translateY.value = position === "bottom" ? 100 : -100;
			opacity.value = 0;

			translateY.value = withSpring(0, { damping: 15, stiffness: 100 });
			opacity.value = withTiming(1, { duration: 300 });

			const timer = setTimeout(() => {
				translateY.value = withSpring(
					position === "bottom" ? 100 : -100, 
					{ damping: 15, stiffness: 100 }
				);
				opacity.value = withTiming(0, { duration: 300 }, (finished) => {
					if (finished) runOnJS(hide)();
				});
			}, duration);

			return () => clearTimeout(timer);
		}
	}, [visible]);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }],
		opacity: opacity.value,
		pointerEvents: opacity.value > 0 ? "auto" : "none",
	}));

	return (
		<Animated.View style={[
			styles.container,
			{ 
				backgroundColor: withOpacity(color, 0.2), 
				borderColor: withOpacity(color, 0.5),
				bottom: position === "bottom" ? 130 : undefined,
				top: position === "top" ? 100 : undefined
			},
			animatedStyle,
		]}>
			<BlurView
				blurType="dark"
				blurAmount={5}
				style={StyleSheet.absoluteFill}
			/>
			<Icon type={type} />
			<View style={styles.containerContent}>
				<Text style={styles.titleText}>
					{title ?? `${capitalizeWords(type)}!`}
				</Text>
				{message &&
					<Text style={styles.descriptionText}>
						{capitalizeFirstLetter(message)}
					</Text>
				}
			</View>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 80,
		borderRadius: 50,
		overflow: "hidden",
		borderWidth: 3,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		paddingHorizontal: 10,
		gap: 10,
		position: "absolute",
		left: 20,
		right: 20,
		zIndex: 999,
	},
	containerContent: {
		height: "80%",
		flex: 1,
		justifyContent: "center",
		alignItems: "flex-start",
		gap: 2,
	},
	icon: {
		padding: 0,
		margin: -5,
		justifyContent: "center",
		alignItems: "center",
	},
	titleText: {
		fontFamily: "Sora-Bold",
		fontSize: 24,
		lineHeight: 30,
		includeFontPadding: false,
		textAlignVertical: "center",
		color: Color.primaryWhite,
	},
	descriptionText: {
		fontFamily: "Sora-SemiBold",
		fontSize: 15,
		lineHeight:18,
		includeFontPadding: false,
		textAlignVertical: "center",
		color: withOpacity(Color.primaryWhite, 0.6),
	},
});

export default Toast;
