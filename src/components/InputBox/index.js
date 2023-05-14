import { useState } from 'react';
import { TextInput ,StyleSheet} from 'react-native';
import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API,graphqlOperation ,Auth} from 'aws-amplify';
import {createMessage,updateChatRoom} from "../../graphql/mutations"
const InputBox = ({chatroom}) => {
    const [text, setText] = useState("");
    
    const onSend =async () =>{
        //console.log("send msg",text);
          const authUser = await Auth.currentAuthenticatedUser();
        const newMessage = { 
            chatroomID:chatroom.id,
      text,
      userID: authUser.attributes.sub,
    };
    
        const newMessageData = await API.graphql(graphqlOperation(createMessage,{input:newMessage}));
        


        setText('');
        //set the last message of the chatroom
        await API.graphql(graphqlOperation(updateChatRoom,{input: {_version: chatroom._version, chatRoomLastMessageId: newMessageData.data.createMessage.id, id: chatroom.id}}))

    };

    return (

        <SafeAreaView edges={['bottom']} style={styles.container}>
       { /*icons*/}
            <AntDesign name='plus' size={20} color={"royalblue"} />
            {/*Text input*/ }
            <TextInput value={text} 
            onChangeText={setText} 
            style={styles.input} 
            placeholder='type your message'/>
            {/* icon*/}
            <MaterialIcons onPress={(onSend   )} style={styles.send} name='send' size={16} color={'white'} />
   </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        backgroundColor:'whitesmoke',
        padding:5,
        paddingHorizontal:10,
        alignItems:'center',
    },
    input:{
        flex:1,
        backgroundColor:'white',
        padding:5,
        paddingHorizontal:10,
        marginHorizontal:10,
        borderRadius:20,
        borderWidth:StyleSheet.hairlineWidth,

    },
    send:{
        backgroundColor:'royalblue',
        padding:7,
        borderRadius:15,
        overflow:'hidden',

    },

});

export default InputBox;