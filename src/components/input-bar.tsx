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
import { LinearGradient } from 'react-native-linear-gradient';
import { withOpacity } from '@/utils/color';


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
		<LinearGradient
            colors={colors}
            locations={locations}
            start={start}
            end={end}
			style={[
				styles.gradient,
				style
			]}
		>
			<View style={styles.container}>
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
		</LinearGradient>
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
		overflow: "hidden",
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
		paddingLeft: 20,
		paddingRight: 5,
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
