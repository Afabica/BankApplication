import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import  jwtDecode  from 'jwt-decode';
import { parseCookies } from 'nookies';


export function middleware(req: NextRequest) {
    const token = req.cookies.get('jwt')?.value;

    if(!token) {
        return NextResponse.redirect( new URL('/signin', req.url));

}
    
    return axios.post('http://localhost:8080/api/auth/verify', { token })
    .then(() => NextResponse.next())
    .catch(() => NextResponse.redirect(new URL('/signin', req.url))); 
    }

export const config = {
    matcher: ['/dashboard', '/dashboard/**/*', '/dashboard/*', '/account', '/']
}



export async function getJwtTokenFromCookies(endpoint) {
    const cookies = parseCookies();
    const token = cookies.jwt;

    if(!token) {
        console.log('No token found');
        return;
    }
    
    const response = await axios.get(endpoint, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if(response.status == 200) {
        const fetchedData = await response.json();
        console.log(fetchedData);
    } else {
        console.log('Failed to fecth data from defined endpoint');
    }
}

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const token = cookies.jwt; // Read JWT token from cookies

  if (!token) {
    // If no token exists, redirect to login
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  try {
    // Decode token to check user permissions or roles
    const decodedToken = jwtDecode(token);
    const isTokenExpired = decodedToken.exp * 1000 < Date.now();

    if (isTokenExpired) {
      // Redirect to login if token is expired
      return {
        redirect: {
          destination: '/signin',
          permanent: false,
        },
      };
    }

    // If access is granted, pass props to the page
    return {
      props: { user: decodedToken }, // Make user data available as props
    };
  } catch (error) {
    console.error('Invalid token:', error);

    // Redirect to login on token error
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }
}


