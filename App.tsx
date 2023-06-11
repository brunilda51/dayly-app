
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Books from './screens/Books';
import UserScreen from './screens/UserScreen';
import Tasks from './screens/Tasks';

const Drawer = createDrawerNavigator();
 
export default function App() {
  return (
    <NavigationContainer><Drawer.Navigator>
      <Drawer.Screen name="Home" component={(Tasks)} />
      <Drawer.Screen name="Movies" component={UserScreen} />
      <Drawer.Screen name="Books" component={Books} />
      <Drawer.Screen name="Tv Shows" component={UserScreen} />
    </Drawer.Navigator></NavigationContainer>
  ); 
}
