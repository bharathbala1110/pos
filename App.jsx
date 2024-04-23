import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import Tabs from './screens/Tabs';
import {Button} from 'react-native';
import Purchase from './screens/Purchases/Purchase';
import Material from './screens/Purchases/Material';
import NewPurchase from './screens/Purchases/NewPurchase';
import CameraApp from './screens/CameraApp';
import PurchaseConfirm from './screens/Purchases/PurchaseConfirm';
import Batch from './screens/Batches/Batch';
import PurchaseSignatory from './screens/Purchases/PurchaseSignatory';
import {Provider} from 'react-redux';
import {store} from './store/store';
import NewBatch from './screens/Batches/NewBatch';
// import PurchaseConfirm from './screens/Purchases/PurchaseConfirm';
// import PurchaseSignatory from './screens/Purchases/PurchaseSignatory';
// import "react-native-devsettings";
// // OR if you are using AsyncStorage
// import "react-native-devsettings/withAsyncStorage";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Purchase" component={Purchase} />
          <Stack.Screen name="Batch" component={Batch} />
          <Stack.Screen name="NewBatch" component={NewBatch} />
          <Stack.Screen
            name="PurchaseDetails"
            component={Home}
            options={{title: 'Order Details'}}
          />
          <Stack.Screen
            name="NewPurchase"
            component={NewPurchase}
            options={{title: 'New Purchase'}}
          />
          <Stack.Screen
            name="CameraApp"
            component={CameraApp}
            options={{headerShown: false}}
            initialParams={{}}
          />
          <Stack.Screen
            name="MaterialPage"
            component={Material}
            options={{title: 'New Purchase'}}
          />
          {/* <Stack.Screen
          name="PurchaseSignatory"
          component={Home}
          options={{title: 'Signature'}}
        /> */}
          <Stack.Screen
            name="PurchaseConfirm"
            component={PurchaseConfirm}
            options={{title: 'Confirmation'}}
          />
          <Stack.Screen
            name="PurchaseSignatory"
            component={PurchaseSignatory}
            options={{title: 'Signature'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
