import { Decrypts } from 'config/api/decrypts';
import jwtDecode from 'jwt-decode';

const useCheckTokenExpired = () => { 
    let isExpired = false;
    const token = Decrypts();
    if(token) {
        const decodedToken: any = jwtDecode(token);
        const currentDate = new Date();
        // JWT exp is in seconds
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            localStorage.removeItem('serviceToken');
            localStorage.removeItem('user_info');           
        } else {
            isExpired = true;      
        }
    }
    else {
        isExpired = true;
    }   
    return isExpired
}

export default useCheckTokenExpired