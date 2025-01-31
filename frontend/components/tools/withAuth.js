import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import nookies, { parseCookies } from 'nookies';
import {jwtDecode} from 'jwt-decode';  // For decoding the JWT token

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      // Get the JWT token from the cookies
      const cookies = parseCookies();
      const token = cookies.jwt;

      // If the token is missing, redirect to login page
      if (!token) {
        router.push("/signin");
        return;
      }

      try {
        // Decode the token to extract the payload
        const decodedToken = jwtDecode(token);

        // Check if the token is expired
        const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
        if (expirationTime < Date.now()) {
          // If the token is expired, redirect to login
          router.push("/signin");
          return;
        }
      } catch (error) {
        // If token decoding fails, redirect to login page
        console.error('Error decoding token', error);
        router.push("/signin");
      }
    }, [router]);  // Dependency array ensures this effect runs once on mount

    // Return the protected component if the user is authenticated
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;


export async function parseJwt(token) {
    if(!token) {return;}
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

