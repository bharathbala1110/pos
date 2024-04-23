import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
const Tab = createBottomTabNavigator();
export default function Tabs() {
  return (
    <Tab.Navigator> 
      <Tab.Screen name="Home" component={Home}  />
      <Tab.Screen name="Details" component={Home} />
      <Tab.Screen name="Setting" component={Home} />
      <Tab.Screen name="Profile" component={Home} />
    </Tab.Navigator>
  );
}
