import { useRouter } from 'next/navigation';
import nookies, {parseCookes} from 'nookies';


const LogoutButton = () => {
const router = useRouter();

    const handleLogout = () => {
    nookies.destroy(null, 'jwt');

    router.push('/signin');
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Logout 
        </button>
    )
}

export default LogoutButton;
