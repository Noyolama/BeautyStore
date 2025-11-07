import { Navigate, Outlet } from "react-router-dom"
import { useUser } from "@/lib/auth/authConfig"

export const ProtectedRoute = () => {
    const user = useUser()

    if (!user?.isLoading && !user?.data) {
        return (
            <Navigate to={'/auth'} />
        )
    }

    return <Outlet />
}