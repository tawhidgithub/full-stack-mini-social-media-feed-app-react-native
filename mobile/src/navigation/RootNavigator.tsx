import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";

import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "../component/LoadingSpinner";
import { useAuthContext } from "../hooks/useAuthContext";

export default function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return <LoadingSpinner text="Loading..." />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
