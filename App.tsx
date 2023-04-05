
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WelcomeScreen from './screens/WelcomeScreen';
import UserScreen from './screens/UserScreen';

const Drawer = createDrawerNavigator();
 
export default function App() {
  return (
    <NavigationContainer><Drawer.Navigator>
      <Drawer.Screen name="Tasks" component={(WelcomeScreen)} />
      <Drawer.Screen name="Chores" component={UserScreen} />
      <Drawer.Screen name="Books" component={WelcomeScreen} />
      <Drawer.Screen name="Movies" component={UserScreen} />
      <Drawer.Screen name="Journal" component={WelcomeScreen} />
      <Drawer.Screen name="Calendar" component={UserScreen} />
    </Drawer.Navigator></NavigationContainer>
  ); 
}
