import { create } from 'zustand';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import api from '../services/api';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,

  // Initialize auth state on app load
  initializeAuth: () => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          try {
            // Get Firebase ID token
            const firebaseToken = await firebaseUser.getIdToken();
            
            // Send token to backend to verify and get JWT
            const response = await api.post('/auth/firebase-login', {
              firebaseToken,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              uid: firebaseUser.uid
            });
            
            const { token, user } = response.data;
            
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            
            set({
              user,
              token,
              isAuthenticated: true,
              loading: false
            });
          } catch (error) {
            console.error('Error syncing Firebase user with backend:', error);
            set({ loading: false });
          }
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false
          });
        }
        resolve();
      });
      
      return () => unsubscribe();
    });
  },

  // Register with email and password
  register: async (credentials) => {
    set({ loading: true, error: null });
    try {
      // Create Firebase user
      const firebaseUser = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      
      // Get Firebase ID token
      const firebaseToken = await firebaseUser.user.getIdToken();
      
      // Send to backend to create user in MongoDB and return JWT
      const response = await api.post('/auth/firebase-register', {
        firebaseToken,
        email: firebaseUser.user.email,
        displayName: credentials.fullName || firebaseUser.user.displayName,
        uid: firebaseUser.user.uid,
        ...credentials // Include any additional fields from form
      });
      
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      set({
        user,
        token,
        isAuthenticated: true,
        loading: false
      });
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Registration failed';
      set({ error: message, loading: false });
      return { success: false, error: message };
    }
  },

  // Login with email and password
  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      // Sign in with Firebase
      const firebaseUser = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      
      // Get Firebase ID token
      const firebaseToken = await firebaseUser.user.getIdToken();
      
      // Verify token with backend and get JWT
      const response = await api.post('/auth/firebase-login', {
        firebaseToken,
        email: firebaseUser.user.email,
        uid: firebaseUser.user.uid
      });
      
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      set({
        user,
        token,
        isAuthenticated: true,
        loading: false
      });
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed';
      set({ error: message, loading: false });
      return { success: false, error: message };
    }
  },

  // Logout
  logout: async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({
        user: null,
        token: null,
        isAuthenticated: false
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  // Update user profile
  updateUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  }
}));

export default useAuthStore;

