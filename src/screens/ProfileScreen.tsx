import { 
    Pressable,
	StyleSheet, 
	Text, 
	View 
} from "react-native"
import { useAuthStore } from "@/store/auth";
import { Octicons } from "@react-native-vector-icons/octicons";
import { Color } from "@/theme/color";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppStackNavigationProps } from "@/types/navigation";
import { useNavigation } from "@react-navigation/native";
import Button from "@/components/button";

const ProfileScreen = () => {
	const insets = useSafeAreaInsets();
	const { user, clear } = useAuthStore();
	const navigation = useNavigation<AppStackNavigationProps>();
	const handleBack = () => navigation.goBack();

	return (
		<View style={[
			styles.container,
			{paddingTop: insets.top}
		]}>
			<View style={styles.containerTopBar}>
				<Pressable 
					style={styles.backButton}
					onPress={handleBack}
					android_ripple={{ 
						borderless: true,
						radius: 20,
						color: Color.tertiaryDark 
					}}
				>
					<Octicons name="chevron-left" size={36} color={Color.primary} />
				</Pressable>
				<Text style={styles.title}>Profile</Text>
			</View>
			<Octicons name="feed-person" size={120} color={Color.primaryAlt} />
			<Text style={[styles.text, styles.name]}>
				{user?.fullName || "Guest"}
			</Text>
            <Text style={[styles.text]}>
				{user?.userName}
			</Text>
			<Text style={[styles.text]}>
				{user?.emailId}
			</Text>
            <Text style={[styles.text]}>
				{user?.baseRole}
			</Text>
			<Button
				colors={[Color.primary, Color.primaryDark]}
                onPress={clear}
			>
				<Text style={styles.text}>Logout</Text>
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    containerTopBar: {
        width: "100%",
        height: 50,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    backButton: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
		lineHeight: 24,
        fontSize: 28,
        fontFamily: "Sora-SemiBold",
        color: Color.primary,
    },
    text: {
        fontSize: 24,
        color: Color.primary,
    },
    name: {
        fontSize: 28,
        fontFamily: "Sora-Bold",
    },
});

export default ProfileScreen;
