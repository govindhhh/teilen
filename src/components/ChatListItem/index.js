import { Text ,View, Image,StyleSheet ,Pressable} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
const ChatListItem = ({chat}) => {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    useEffect(() => {
    const fetchUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      // Loop through chat.users.items and find a user that is not us (Authenticated user)
      const userItem = chat.users.items.find(
        (item) => item.user.id !== authUser.attributes.sub
      );
      setUser(userItem?.user);
    };

    fetchUser();
  }, []);

    //chat through chat.users.item and find a user that is not authenticated user
   
    console.log(user);
    return(
        <Pressable onPress={() => navigation.navigate("Chat", {id: chat.id, name: user?.name}) } 
        style ={styles.container}>
            <Image 
            source={{uri: user?.image}} 
            style={styles.image} />
            <View style={styles.content}>
            <View style={styles.row}>
                <Text numberOfLines={1} style={styles.name}>
                {user?.name}
                </Text>
                <Text style={styles.subTitle}>
                {dayjs(chat.lastMessage?.createdAt).fromNow(true)}
                </Text>
            </View>
            <Text numberOfLines={1} style={styles.subTitle}>
            {chat.lastMessage?.text}
            </Text>
            </View>
        </Pressable>
    )
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems:"stretch",
        marginHorizontal: 10,
        marginVertical: 5,
        height:70,
    },
    image:{
        width: 60,
        aspectRatio:1,
        borderRadius:30,
        marginRight:10,
    },
    content: {
        flex: 1,
    borderBottomColor:"lightgray",
    borderBottomWidth:StyleSheet.hairlineWidth,

    },
    row:{
        flexDirection:'row',
        marginBottom:5,
    },
    name:{flex: 1,
    fontWeight:'bold',},
    subTitle:{
        color:'gray'

    }
})
export default ChatListItem;