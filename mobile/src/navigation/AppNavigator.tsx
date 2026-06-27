import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FeedScreen from "../screens/FeedScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import CustomButton from "../component/CustomButton";
import { useAuth } from "../hooks/useAuth";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          title: "Feed",
          headerRight: () => (
            <CustomButton
              onPress={() => handleLogout()}
              title="Logout"
              varient="error"
              className="px-5 bg-white border-2 text-red-400 border-red-400"
            />
          ),
        }}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{
          title: "Create Post",
        }}
      />
    </Stack.Navigator>
  );
}
