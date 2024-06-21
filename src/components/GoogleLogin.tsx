// src/components/GoogleLogin.js
import { auth, googleProvider, signInWithPopup } from '../firebase';

const GoogleLogin = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('User:', user);
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <button onClick={handleGoogleLogin}>
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;
