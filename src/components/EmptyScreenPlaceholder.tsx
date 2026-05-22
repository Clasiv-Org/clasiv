import { 
	StyleSheet, 
	Text, 
	View, 
} from "react-native";
import { Color } from "@/theme/color";
import type { EmptyScreenPlaceholderProps } from "@/types/emptyScreenPlaceholder";
import { withOpacity } from "@/utils/color";

const EmptyScreenPlaceholder = (props: EmptyScreenPlaceholderProps) => {
	return (
		<View style={styles.container}>
			{props.children}
            <Text style={styles.titleText}>{props.title}</Text>
			<Text style={styles.descriptionText}>{props.message}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
		height: "100%",
		paddingVertical: 200,
        justifyContent: "center",
        alignItems: "center",
    },
    titleText: {
        fontSize: 32,
		fontFamily: "Sora-Bold",
        marginTop: 30,
		textAlign: "center",
        color: withOpacity(Color.primaryWhite, 0.8),
    },
    descriptionText: {
        fontSize: 20,
        fontFamily: "Sora-SemiBold",
        marginTop: 10,
		textAlign: "center",
        color: Color.tertiary,
    },
});

export default EmptyScreenPlaceholder;
