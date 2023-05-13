import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotImplementedScreen from '../screens/NotImplementedScreen';
import ChatsScreen from '../screens/ChatsScreen/ChatsScreen';
import {Ionicons,Entypo} from "@expo/vector-icons";
import SettingsScreen from '../screens/SettingsScreen';
const Tab = createBottomTabNavigator();
const MainTabNavigator = () =>{
    return (
        <Tab.Navigator
        screenOptions={{
        tabBarStyle:{backgroundcolor :'#9000ff'},
        
        headerStyle:{backgroundColor: '#9000ff'}
        }}>
            
            
            <Tab.Screen 
            name="Chats" 
            component={ChatsScreen}
            options={({navigation}) => ({
                      headerTitleAlign: 'center',
                       tabBarIcon: ({color,size}) => 
                       (
                       <Entypo name="chat"  size={size} color={color} />),
                       headerRight:() =>(
                        <Entypo 
                        onPress={() => navigation.navigate('Contacts')}
                        name='new-message' size={18} color='black' style={{marginRight:15}} />
                       ),
                       })}/>
            <Tab.Screen name="Settings" component={SettingsScreen}options={{
                      headerTitleAlign: 'center',
                       tabBarIcon: ({color,size}) => <Ionicons name='settings-outline' size={size} color={color} />
                       }}/>
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
