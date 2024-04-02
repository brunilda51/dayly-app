import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider, useSelector } from "react-redux";
import Books from "./screens/books/Books";
import Stats from "./screens/stats/Stats";
import Movies from "./screens/movies/Movies";
import TvShows from "./screens/tv/Tv";
import Profile from "./screens/Profile";
import SignInForm from "./screens/authentication/SignInForm";
import SignUpForm from "./screens/authentication/SignUpForm";
import { store } from "./redux";
import React from "react";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Define a custom component to check if the user is signed in
const AuthNavigator = () => {
  const isSignedIn = useSelector((state: any) => state.auth.isAuthenticated);

  return (
    <Stack.Navigator>
      {isSignedIn ? (
        <Stack.Screen
          name="Main"
          component={AppDrawer}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignInForm}
            options={{ title: "Sign In" }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpForm}
            options={{ title: "Sign Up" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const AppDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Stats} />
      <Drawer.Screen name="Movies" component={Movies} />
      <Drawer.Screen name="Books" component={Books} />
      <Drawer.Screen name="Tv Shows" component={TvShows} />
      <Drawer.Screen name="My Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </Provider>
  );
}
