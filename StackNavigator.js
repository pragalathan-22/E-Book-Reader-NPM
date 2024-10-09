import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import LilbraryScreen from "./screens/LibraryScreen";
import ImportScreen from "./screens/ImportScreen";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';




const Tab = createBottomTabNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator
    screenOptions={{
        tabBarStyle: {
            backgroundColor: "rgba(255, 255, 255, 0.5)",  // Semi-transparent white for a glass effect
            backdropFilter: "blur(10px)",  // This is more applicable in web-based setups, but just for reference
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


            {/* <Tab.Screen name="Library" component={LilbraryScreen}
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
            /> */}

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
    )
}

const Stack = createNativeStackNavigator();
function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                {/* <Stack.Screen name="Library" component={LilbraryScreen} options={{ headerShown: false }} /> */}
                <Stack.Screen name="Import" component={ImportScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
                

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;
