import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider } from "react-redux";
import Books from "./screens/books/Books";
import Stats from "./screens/Stats";
import Movies from "./screens/movies/Movies";
import TvShows from "./screens/tv/Tv";
import Profile from "./screens/Profile";
import { useState } from "react";
import SignUpForm from "./screens/authentication/SignUpForm";
import { store } from "./redux";
import React from "react";

const Drawer = createDrawerNavigator();

export default function App() {
  const [isSignedUp, setIsSignedUp] = useState(false);
  return (
    <React.StrictMode>
      <Provider store={store}>
        {isSignedUp ? (
          <NavigationContainer>
            <Drawer.Navigator>
              <Drawer.Screen name="Home" component={Stats} />
              <Drawer.Screen name="Movies" component={Movies} />
              <Drawer.Screen name="Books" component={Books} />
              <Drawer.Screen name="Tv Shows" component={TvShows} />
              <Drawer.Screen name="My Profile" component={Profile} />
            </Drawer.Navigator>
          </NavigationContainer>
        ) : (
          <SignUpForm></SignUpForm>
        )}
      </Provider>
    </React.StrictMode>
  );
}
