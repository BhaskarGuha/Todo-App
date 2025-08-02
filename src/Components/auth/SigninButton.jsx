// components/auth/SigninButton.jsx
import { GoogleLogin } from '@react-oauth/google';
import styles from './SigninButton.module.css';
import axios from 'axios';

function SigninButton() {
  const handleSuccess = async (credentialResponse) => {
    const credential = credentialResponse.credential;

    try {
      const response = await axios.post('http://localhost:5000/login', {
        credential: credential,
      });

      const token = response.data.token;
      localStorage.setItem('token', token); // Save JWT for future API calls
      console.log("Login successful. JWT:", token);

      // Optional: Redirect or fetch protected data
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.signinFixed}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </div>
  );
}

export default SigninButton;
