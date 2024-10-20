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
import SavedBooks from "./screens/SavedBooks";
import ImportPlayScreen from "./screens/ImportPlayScreen";
import HelpSupportScreen from "./screens/HelpSupportScreen";
import AppPreferencesScreen from "./screens/AppPreferencesScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LilbraryScreen from "./screens/LilbraryScreen";

const Tab = createBottomTabNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "rgba(255, 255, 255, 0.5)",  // Semi-transparent white for a glass effect
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
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
                    margin: 10, // Add margin to make it look more elevated
                },
                tabBarLabelStyle: {
                    color: "#4f4f4f",
                },
                tabBarActiveTintColor: "#334155",
                tabBarInactiveTintColor: "#95a5a6",
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    headerShown: false,
                    tabBarLabelStyle: { color: "white" },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <FontAwesome name="home" size={24} color="black" />
                        ) : (
                            <AntDesign name="home" size={24} color="black" />
                        ),
                }}
            />

            <Tab.Screen name="Import" component={ImportScreen}
                options={{
                    tabBarLabel: "Import",
                    headerShown: false,
                    tabBarLabelStyle: { color: "white" },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <MaterialCommunityIcons name="file-upload" size={24} color="black" />
                        ) : (
                            <MaterialIcons name="upload-file" size={24} color="black" />
                        ),
                }}
            />

            <Tab.Screen name="Library" component={LilbraryScreen}
                options={{
                    tabBarLabel: "Library",
                    headerShown: false,
                    tabBarLabelStyle: { color: "white" },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="library" size={24} color="black" />
                        ) : (
                            <Ionicons name="library-outline" size={24} color="black" />
                        ),
                }}
            />

            <Tab.Screen name="Profile" component={ProfileScreen}
                options={{
                    tabBarLabel: "Profile",
                    headerShown: false,
                    tabBarLabelStyle: { color: "white" },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="person" size={24} color="black" />
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
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Import" component={ImportScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
            <Stack.Screen name="LibraryScreen" component={LilbraryScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SeeMore" component={SeeMoreScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PlayScreen" component={PlayScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SearchResults" component={SearchResultsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AuthorPage" component={AuthorPage} options={{ headerShown: false }} />
            <Stack.Screen name="AuthorBooksScreen" component={AuthorBooksScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SavedBooks" component={SavedBooks} options={{ headerShown: false }} />
            <Stack.Screen name="ImportPlayScreen" component={ImportPlayScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HelpSupport" component={HelpSupportScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AppPreferencesScreen" component={AppPreferencesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default Navigation;
