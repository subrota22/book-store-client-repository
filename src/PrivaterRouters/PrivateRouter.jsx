import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PageLoader from '../components/Share/PageLoader/PageLoader';
import { AuthProvider } from '../UserContext/UserContext';

const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext(AuthProvider);
    if (loading) {
        return <PageLoader> </PageLoader>
    }
    if (user && user.uid) {
        return (
            <>
                {children}
            </>
        );
    } else {
        return <Navigate to="/login"></Navigate>
    }
};

export default PrivateRouter;