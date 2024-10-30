import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AdminDashboard,ManageEvents } from '../screens/admin';

export type AdminStackParamList = {
  AdminDashboard: undefined;
  ManageEvents: undefined;
};

const Stack = createStackNavigator<AdminStackParamList>();

const AdminStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
    <Stack.Screen name="ManageEvents" component={ManageEvents} />
  </Stack.Navigator>
);

export default AdminStack;
