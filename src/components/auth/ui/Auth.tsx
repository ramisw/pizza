import {Login} from "@/components/auth/ui/Login";
import {Signup} from "@/components/auth/ui/Signup";

export const Auth = ({type}: { type: 'login' | 'signup' }) => {
    if (type === 'login') {
        return <Login/>
    } else {
        return <Signup/>
    }
}