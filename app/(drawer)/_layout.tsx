import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Index = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="dashboard"
          options={{
            title: 'Dashboard',
            drawerIcon: () => <FontAwesome name="dashboard" size={20} color="#1B3A7A" />,
          }}
        />
        <Drawer.Screen
          name="managetask"
          options={{
            title: 'Manage Tasks',
            drawerIcon: () => <FontAwesome name="tasks" size={20} color="#1B3A7A" />,
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            title: 'Profile',
            drawerIcon: () => <FontAwesome name="user" size={20} color="#1B3A7A" />,
          }}
        />
        
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default Index;
