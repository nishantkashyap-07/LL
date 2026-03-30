import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch extra profile data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};
        setUser({
          id: firebaseUser.uid,
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || userData.name || firebaseUser.email.split('@')[0],
          phone: userData.phone || '',
          isAdmin: userData.isAdmin || false,
          isSeller: userData.isSeller || false,
          sellerStatus: userData.sellerStatus || null,
          photoURL: firebaseUser.photoURL || userData.photoURL || null,
          ...userData
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  };

  const signup = async (email, password, name, phone = '') => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });
    // Save to Firestore
    await setDoc(doc(db, 'users', result.user.uid), {
      name,
      email,
      phone,
      isAdmin: false,
      isSeller: false,
      sellerStatus: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return result.user;
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // Create user doc if first time
    const userDoc = await getDoc(doc(db, 'users', result.user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', result.user.uid), {
        name: result.user.displayName,
        email: result.user.email,
        phone: '',
        isAdmin: false,
        isSeller: false,
        sellerStatus: null,
        photoURL: result.user.photoURL,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
    return result.user;
  };

  const logout = () => signOut(auth);

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const updateUserProfile = async (updates) => {
    if (!user) return;
    await setDoc(doc(db, 'users', user.uid), { ...updates, updatedAt: serverTimestamp() }, { merge: true });
    if (updates.name) await updateProfile(auth.currentUser, { displayName: updates.name });
    setUser(prev => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, loginWithGoogle, logout, resetPassword, updateUserProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
