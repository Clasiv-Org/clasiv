import { 
	Pressable, 
	StyleSheet 
} from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
} from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";
import { Color } from "@/theme/color";
import { ButtonProps } from "@/types/button";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button = ({
    children,
    style,
	gradientStyle,
    onPress,
    colors,
    start,
    end,
	locations, 
    scaleOnPress = 0.98,
    duration = 150,
    ...rest
}: ButtonProps) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: withTiming(scale.value, {
            duration,
            easing: Easing.out(Easing.quad),
        }) }],
    }));

    return (
        <AnimatedPressable
            style={[
                styles.button,
                animatedStyle,
                typeof style === "function" ? 
					style({ pressed: false }) : 
					style,
            ]}
            onPress={onPress}
            onPressIn={() => { scale.value = scaleOnPress; }}
            onPressOut={() => { scale.value = 1; }}
            {...rest}
        >
            <LinearGradient
                colors={colors ?? [Color.primary, Color.primaryDark]}
                start={start ?? {x: 0.5, y: 0}}
                end={end ?? {x: 0.5, y: 1}}
                locations={locations ?? [0, 1]}
				style={[
					styles.gradientFill,
					gradientStyle
				]}
            >
                {children}
            </LinearGradient>
        </AnimatedPressable>
    );
};

const styles = StyleSheet.create({
    button: {
		width: 100,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        overflow: "hidden",
    },
    gradientFill: {
        ...StyleSheet.absoluteFill,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Button;
