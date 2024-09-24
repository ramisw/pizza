'use client'
import {useAppSelector} from "@/hooks/redux";

export const Profile = () => {

    const {user} = useAppSelector(state => state.auth)

    return (
        <div>
            <h1>Username: {user?.displayName}</h1>
            <h1>Email: {user?.email}</h1>
        </div>
    )
}