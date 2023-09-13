import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Books from "./screens/books/Books";
import Stats from "./screens/Stats";
import Movies from "./screens/movies/Movies";
import TvShows from "./screens/tv/Tv";
import Profile from "./screens/Profile";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={Stats} />
          <Drawer.Screen name="Movies" component={Movies} />
          <Drawer.Screen name="Books" component={Books} />
          <Drawer.Screen name="Tv Shows" component={TvShows} />
          <Drawer.Screen name="My Profile" component={Profile} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
