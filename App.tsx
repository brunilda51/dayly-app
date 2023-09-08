import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Books from "./screens/Books";
import Stats from "./screens/Stats";
import Movies from "./screens/Movies";
import TvShows from "./screens/Tv";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Stats} />
        <Drawer.Screen name="Movies" component={Movies} />
        <Drawer.Screen name="Books" component={Books} />
        <Drawer.Screen name="Tv Shows" component={TvShows} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
