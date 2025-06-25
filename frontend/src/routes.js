
import Dashboard from "./pages/Dashboard.js"
import Login from "./pages/Login.js"


export const PublicRoutes = [
    {
        path:'/login',
        element: Login
    }
]

export const PrivateRoutes =  [
    {
        path: '/dashboard',
        element: Dashboard,
    }
]