import {useContext} from 'react';
import {Navigate , Outlet} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';

const ProtectedRoute = () => {
    const {isAuth} = useContext(AuthContext);
    return isAuth ? 
        <DashboardLayout> 
            <Outlet/> 
            </DashboardLayout> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

