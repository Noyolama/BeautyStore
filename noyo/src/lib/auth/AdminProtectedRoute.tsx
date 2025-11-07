import { Navigate, Outlet } from "react-router-dom"
import { useUser } from "@/lib/auth/authConfig"

export const AdminProtectedRoute = () => {
    const user = useUser()

    if (!user?.isLoading && user?.data?.role === 'user') {
        return (
            <Navigate to={'/403'} />
        )
    } else if (!user?.isLoading && user?.data?.role !== 'admin') {
        return (
            <Navigate to={'/auth'} />
        )
    }

    return <Outlet />
}