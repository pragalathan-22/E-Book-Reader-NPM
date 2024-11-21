import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import ImportScreen from "./screens/ImportScreen";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SeeMoreScreen from "./screens/SeeMoreScreen";
import PlayScreen from './screens/PlayScreen';
import SearchResultsScreen from "./screens/SearchResultsScreen";
import AuthorPage from "./screens/AuthorPage";
import AuthorBooksScreen from "./screens/AuthorBooksScreen";
import ImportPlayScreen from "./screens/ImportPlayScreen";
import HelpSupportScreen from "./screens/HelpSupportScreen";
import AppPreferencesScreen from "./screens/AppPreferencesScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LilbraryScreen from "./screens/LilbraryScreen";
import AccountSettingsScreen from "./screens/AccountSettingsScreen";
import SuggestionsPage from './screens/SuggestionsPage';

const Tab = createBottomTabNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#abb2b9", // Semi-transparent white for a glass effect
                    position: "absolute",
                    shadowColor: "#000", // Shadow color
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                    elevation: 4,
                    shadowOffset: {
                        width: 0,
                        height: -3,
                    },
                    borderTopWidth: 0,
                    borderRadius: 15, // Rounded corners
                },
                tabBarLabelStyle: {
                    color: "#4f4f4f",
                },
                tabBarActiveTintColor: "#334155",
                tabBarInactiveTintColor: "#95a5a6",
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    headerShown: false,
                    tabBarLabelStyle: { color: "white" },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <FontAwesome name="home" size={24} color="#212f3d" />
                        ) : (
                            <AntDesign name="home" size={24} color="black" />
                        ),
                }}
            />

            <Tab.Screen
                name="Import"
                component={ImportScreen}
                options={{
                    tabBarLabel: "Import",
                    headerShown: false,
                    tabBarLabelStyle: { color: "white" },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <MaterialCommunityIcons name="file-upload" size={24} color="#212f3d" />
                        ) : (
                            <MaterialIcons name="upload-file" size={24} color="black" />
                        ),
                }}
            />

            <Tab.Screen
                name="Library"
                component={LilbraryScreen}
                options={{
                    tabBarLabel: "Library",
                    headerShown: false,
                    tabBarLabelStyle: { color: "white" },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="library" size={24} color="#212f3d" />
                        ) : (
                            <Ionicons name="library-outline" size={24} color="black" />
                        ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: "Profile",
                    headerShown: false,
                    tabBarLabelStyle: { color: "white" },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="person" size={24} color="#212f3d" />
                        ) : (
                            <MaterialIcons name="person-outline" size={24} color="black" />
                        ),
                }}
            />
        </Tab.Navigator>
    );
}

const Stack = createNativeStackNavigator();

function Navigation() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#334155', // Blue background for stack header
                },
                headerTintColor: '#fff', // White text in the header
                headerTitleStyle: {
                    fontWeight: 'bold', // Bold header title
                },
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Import" component={ImportScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
            <Stack.Screen name="LibraryScreen" component={LilbraryScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SeeMore" component={SeeMoreScreen} />
            <Stack.Screen name="PlayScreen" component={PlayScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SearchResults" component={SearchResultsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AuthorPage" component={AuthorPage} />
            <Stack.Screen name="AuthorBooksScreen" component={AuthorBooksScreen} />
            <Stack.Screen name="ImportPlayScreen" component={ImportPlayScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
            <Stack.Screen name="AppPreferencesScreen" component={AppPreferencesScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AccountSettingsScreen" component={AccountSettingsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Suggestions" component={SuggestionsPage} />
        </Stack.Navigator>
    );
}

export default Navigation;
