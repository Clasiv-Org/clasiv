import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { 
	NativeStackNavigationProp, 
	NativeStackScreenProps, 
} from "@react-navigation/native-stack";
import type { CompositeScreenProps } from "@react-navigation/native";

export type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
};

export type AuthStackParamList = {
	Landing: undefined;
    Login: undefined;
	Activate: undefined;
	Onboarding: undefined;
	EmailVerify: undefined;
};

export type TabParamList = {
    Home: undefined;
    Assignments: undefined;
    Announcements: undefined;
};

export type AppStackParamList = {
    Tab: undefined;
    Profile: undefined;
};

export type TabButton = {
    route: string;
    icon: "home-fill" | "inbox-fill" | "checklist";
    label: string;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
    NativeStackScreenProps<AuthStackParamList, T>;

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
    BottomTabScreenProps<TabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
>;

export type RootStackNavigationProps = NativeStackNavigationProp<RootStackParamList>;
export type AuthStackNavigationProps = NativeStackNavigationProp<AuthStackParamList>;
export type AppStackNavigationProps = NativeStackNavigationProp<AppStackParamList>;
