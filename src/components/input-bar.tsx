import React, { 
	useState, 
} from 'react';
import { 
	StyleSheet, 
	View, 
	TextInput, 
	Pressable
} from 'react-native'
import { Octicons } from '@react-native-vector-icons/octicons';
import { InputBarProps } from '@/types/input-bar';
import { Color } from '@/theme/color';
import { BlurView } from '@react-native-community/blur';


const InputBar = ({
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
	isClearButtonEnabled = false,
	style,
	textStyle,
	...rest
}: InputBarProps) => {
	const [secureText, setSecureText] = useState<boolean>(true);
	const [valueLocal, setValueLocal] = useState<string>("");
	const isActive = value 
		? value.length > 0 
		: valueLocal.length > 0;
	const isPassword = textContentType === "password";

	return (
		<View
			style={[
				styles.gradient,
				style
			]}
		>
			<View style={styles.container}>
				<BlurView
					blurType="dark"
					blurAmount={5}
					style={StyleSheet.absoluteFill}
				/>
				{children}
				<TextInput
					value={value ?? valueLocal}
					onChangeText={onChangeText ?? setValueLocal}
					placeholder={placeholder ?? "Input..."}
					placeholderTextColor={placeholderTextColor ?? Color.tertiary}
					secureTextEntry={isPassword ? secureText : false} 
					textContentType={textContentType}
					style={[styles.searchBarInput, textStyle]}
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
						<Octicons 
							name={secureText ? "eye-closed" : "eye"} 
							style={[styles.buttonIcon]} 
							size={20}
						/>
					</Pressable>
				}
				{isClearButtonEnabled && isActive && 
					<Pressable 
						onPress={() => setValueLocal("")}
						style={styles.button}
						android_ripple={{ 
							color: Color.tertiaryDark,
							borderless: true,
							radius: 20
						}}
					>
						<Octicons 
							name="x" 
							style={[styles.buttonIcon]}
							size={20}
						/>
					</Pressable>
				}
			</View>
		</View>
	);
}

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
	container: {
		width: "100%",
		height: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		borderRadius: 50,
		paddingRight: 5,
		overflow: "hidden",
	},
	searchBarInput: {
		flex: 1,
		height: "100%",
		fontSize: 16,
		paddingHorizontal: 20,
		color: Color.primaryWhite,
	},
	button: {
		height: "70%",
		aspectRatio: 1,
		borderRadius: 50,
		textAlign: "center",
		textAlignVertical: "center",
	},
	buttonIcon: {  
		height: "100%",
		aspectRatio: 1,
		borderRadius: 50,
		textAlign: "center",
		textAlignVertical: "center",
		color: Color.primary,
	},
});

export default InputBar;
