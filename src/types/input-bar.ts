import { type LinearGradientProps } from 'react-native-linear-gradient';
import { type TextInputProps } from 'react-native';

export type InputBarProps = LinearGradientProps & TextInputProps & { 
	isClearButtonEnabled?: boolean;
    style?: LinearGradientProps['style'];
	textStyle?: TextInputProps['style'];
};
