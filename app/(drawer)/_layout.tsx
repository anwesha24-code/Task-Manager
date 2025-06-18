import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const index = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
      >
        <Drawer.Screen name="dashboard" />
        <Drawer.Screen name="managetask" />

        <Drawer.Screen name="profile" />
        <Drawer.Screen name="settings" />
        
      </Drawer>
    </GestureHandlerRootView>
  );
}

export default index