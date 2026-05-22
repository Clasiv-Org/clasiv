import { ReactNode } from "react";
import { PressableProps } from "react-native";
import { LinearGradientProps } from "react-native-linear-gradient";

export type ButtonProps = PressableProps & LinearGradientProps & {
    style?: PressableProps["style"];
	gradientStyle?: LinearGradientProps["style"];
    children?: ReactNode;
    scaleOnPress?: number;
    duration?: number;
}
