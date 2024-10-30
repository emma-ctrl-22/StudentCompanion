import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import UserStack from './UserStack';
import AdminStack from './AdminStack';

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const userRole = 'user'; // Placeholder for role-based logic, e.g., 'user', 'admin', 'guest'

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {userRole === 'guest' ? (
          <RootStack.Screen name="Auth" component={AuthStack} />
        ) : userRole === 'admin' ? (
          <RootStack.Screen name="Admin" component={AdminStack} />
        ) : (
          <RootStack.Screen name="User" component={UserStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
