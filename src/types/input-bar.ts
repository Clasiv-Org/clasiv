import { type LinearGradientProps } from "react-native-linear-gradient";
import type { 
	TextProps, 
	TextInputProps 
} from "react-native";

export type InputBarProps = LinearGradientProps & TextInputProps & TextProps & { 
	placeholderLabel?: string;
	placeholderLabelstyle?: TextProps["style"];
	isClearButtonEnabled?: boolean;
    style?: LinearGradientProps["style"];
	textStyle?: TextInputProps["style"];
};

export type InputValueProps = {
	value: string;
	color?: string | null;
	placeholder?: string | null;
}
