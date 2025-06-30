import {Navigate} from 'react-router-dom';
import DashboardLayout from "./layouts/DashboardLayout.js";
import BitcoinPricePage from "./pages/BitcoinPage.js";
import UkPropertySalesPage from "./pages/UkPropertySalesPage.js";
import Login from "./pages/Login.js";
import ProtectedRoute from "./components/ProtectedRoute.js";


export const PublicRoutes = [
    {
        path:'/',
        element: <Navigate to="/login" replace/>
    },
    {
        path:'/login',
        element: <Login />
    }
];

export const PrivateRoutes =  [
    {
        path: '/dashboard',
        element: <ProtectedRoute />, //authentication gate
        children: [
            {
                // element: <DashboardLayout />,
                children:[
                    {
                        index: true,
                        element:<Navigate to = "bitcoin-price" replace />
                    },
                    {
                        path: 'bitcoin-price' , 
                        element: <BitcoinPricePage/>},
                    {
                        path: 'uk-property-sales',
                        element: <UkPropertySalesPage />},
                ],
            }
        ],
    },
];