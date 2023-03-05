import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
// import { useAppContext } from ./AppContext;
import { useChatClient } from './useChatClient';
import {
  Chat,
  OverlayProvider,
  ChannelList,
  Channel,
  MessageList,
  MessageInput
} from 'stream-chat-expo'; // Or stream-chat-expo
import { StreamChat } from 'stream-chat';
import { chatApiKey, chatUserId } from './chatConfig';





const Stack = createStackNavigator();

const filters = {
  members: {
    '$in': [chatUserId]
  },
};
 
const sort = {
  last_message_at: -1,
};

const ChannelListScreen = props => {
  // const { setChannel } = useAppContext();
// 
  return (
    
    <ChannelList
      onSelect={(channel) => {
        const { navigation } = props;
        // setChannel(channel);
        navigation.navigate('ChannelScreen', {channel});
      }}
      filters={filters}
      sort={sort}
    />
  );
};

const ChannelScreen = props => {
  const {route} = props;
  const { params: {channel} } = route

  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
}


const NavigationStack = () => {

  const { clientIsReady } = useChatClient();
  const chatClient = StreamChat.getInstance(chatApiKey);



  if (!clientIsReady) {
    return <Text>Loading chat ...</Text>
  }

  return (
    <OverlayProvider>
    <Chat client={chatClient}>
      <Stack.Navigator>
      <Stack.Screen name="ChannelList" component={ChannelListScreen} />
      <Stack.Screen name="ChannelScreen" component={ChannelScreen} />
      </Stack.Navigator>
    </Chat>
  </OverlayProvider>
  );
};

export default () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <NavigationStack />
      </NavigationContainer>
    </SafeAreaView>
  );
};
