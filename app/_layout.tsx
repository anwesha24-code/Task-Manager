import { Stack } from 'expo-router';
import React from 'react';
import { TaskProvider } from './contexts/TaskContext';
const _layout = () => {
    return (
        <TaskProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />

                <Stack.Screen name="signup" />
            </Stack>
        </TaskProvider>
    )
}

export default _layout