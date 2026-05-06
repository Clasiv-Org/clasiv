import { Ionicons } from "@react-native-vector-icons/ionicons";
import { 
    Pressable,
	StyleSheet, 
	Text, 
	View, 
} from "react-native";
import { Color } from "@/theme/color";

type TopBarProps = {
	title: string;
}

const TopBar = (props: TopBarProps) => {
	return (
		<View style={styles.container}>
			<Text style={styles.titleText}>{props.title}</Text>
			<Pressable 
				style={({pressed}) => [
					styles.containerMenu,
					{
						opacity: pressed ? 0.7 : 1,
						transform: [{scale: pressed ? 0.95 : 1}]
					}
				]}
				onPress={() => {}}
			>
				<Ionicons name="menu" size={32} color={Color.primaryWhite} />
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
		// backgroundColor: Color.tertiary,
    },
    titleText: {
        fontFamily: "Sora-Bold",
        fontSize: 32,
        color: Color.primary,
    },
    containerMenu: {
        height: 40,
        width: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default TopBar;
