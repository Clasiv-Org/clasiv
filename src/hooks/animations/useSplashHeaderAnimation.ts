import { 
	useAnimatedStyle, 
	useSharedValue, 
	withTiming 
} from "react-native-reanimated";

export const useSplashHeaderAnimation = (
	containerHeight: number,
) => {

	const splashContainerHeight = useSharedValue(containerHeight* 0.45);
	const splashConatainerPaddingTop = useSharedValue(50);

	const splashOpacity	= useSharedValue(1);
	const splashScale   = useSharedValue(1);
	const splashDisplay	= useSharedValue<"none" | "flex">("flex");
	const splashHeight  = useSharedValue(200);

	const splashAnimationTime = 250;

	const animateIn = (keyboardHeight: number) => {
		splashContainerHeight.value = withTiming(
			(containerHeight- keyboardHeight) * 0.35, 
			{ duration: splashAnimationTime }
		);
		splashConatainerPaddingTop.value = withTiming(30, { duration: splashAnimationTime });
		splashHeight.value = withTiming(0, { duration: splashAnimationTime });
		splashOpacity.value = withTiming(0, { duration: splashAnimationTime });
		splashScale.value = withTiming(0, { duration: splashAnimationTime }, (finished) => {
			if(finished) splashDisplay.value = "none";
		});
	}

	const animateOut = () => {
		splashDisplay.value = "flex";
		splashContainerHeight.value = withTiming(
			containerHeight* 0.45, 
			{ duration: splashAnimationTime }
		);
		splashConatainerPaddingTop.value = withTiming(50, { duration: splashAnimationTime });
		splashHeight.value = withTiming(200, { duration: splashAnimationTime });
		splashOpacity.value = withTiming(1, { duration: splashAnimationTime });
		splashScale.value = withTiming(1, { duration: splashAnimationTime });
	};

	const animatedSplashContainerStyle = useAnimatedStyle(() => ({
		height: splashContainerHeight.value,
		paddingTop: splashConatainerPaddingTop.value
	}));

	const animatedSplashStyle = useAnimatedStyle(() => ({
		display: splashDisplay.value,
		height: splashHeight.value,
		opacity: splashOpacity.value,
		transform: [
			{ scale: splashScale.value },
		],
	}));

	return { animateIn, animateOut, animatedSplashStyle, animatedSplashContainerStyle };
}
