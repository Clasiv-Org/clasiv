import { 
	useAnimatedStyle, 
	useSharedValue, 
	withTiming 
} from "react-native-reanimated";

export const useScreenAnimation = () => {
	const opacity		= useSharedValue(0);
	const translateX	= useSharedValue(40);

	const animateIn = () => {
		opacity.value		= withTiming(1, { duration: 250 });
		translateX.value	= withTiming(0, { duration: 250 });
	}

	const animateOut = () => {
		opacity.value		= 0;
		translateX.value	= 40;
	};

	const animatedScreenStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
		transform: [{ translateX: translateX.value }],
	}));

	return { animateIn, animateOut, animatedScreenStyle };
}
