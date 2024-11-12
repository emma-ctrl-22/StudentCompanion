import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDocs, collection } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../firebase';
import { Alert } from 'react-native';

type AuthContextType = {
  userRole: string | null;
  login: (studentId: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [userRole, setUserRole] = useState<string | null>('guest');

  useEffect(() => {
    // Check AsyncStorage for saved user data on initial load
    const checkUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const parsedData = JSON.parse(userData);
        setUserRole(parsedData.userRole);
      }
      console.log('User Role:', userData)
    };
    checkUser();
  }, []);

  const login = async (studentId: string, password: string) => {
    try {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);

      let matchedUser = null;

      usersSnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.studentId === studentId) {
          matchedUser = { id: doc.id, ...userData };
        }
      });
      console.log('Matched User:', matchedUser);
      if (matchedUser) {
        if (matchedUser.password === password) {
          const user = {
            FullName: matchedUser.FullName,
            userRole: matchedUser.role,
            uid: matchedUser.id,
          };

          await AsyncStorage.setItem('user', JSON.stringify(user));
          setUserRole(matchedUser.role);
          Alert.alert('Login Successful', `Welcome, ${matchedUser.FullName}`);
        } else {
          Alert.alert('Login Failed', 'Invalid password');
        }
      } else {
        Alert.alert('Login Failed', 'Invalid Student ID');
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Error', 'An error occurred during login');
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUserRole('guest');
    console.log('User Role:', userRole)
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
