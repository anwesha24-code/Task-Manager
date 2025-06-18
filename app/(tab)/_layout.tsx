import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

const TabRoot = () => {
  return (
    <Tabs>
      <Tabs.Screen name="(tab)" />
      <Tabs.Screen name="index" options={{
        title: "Home",tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color}/>
      }} />
      <Tabs.Screen name="profile" options={{title:"Profile", tabBarIcon: ({ color }) => <FontAwesome size={28} name="user-circle-o" color={color} />}}/>
      <Tabs.Screen name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}/>

    </Tabs>
  );
};
export default TabRoot;
