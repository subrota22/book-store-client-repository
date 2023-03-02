import PageLoader from 'Components/Shares/PageLoader/PageLoader';
import  { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthProvider } from 'UserContext/UserContext';

const PrivateRouter :any = ( children:any ) => {
    const { user, loading } = useContext(AuthProvider);
    if (loading) {
        return <PageLoader></PageLoader>
    }
    if (user && user.uid) {
        return (
            <>
                {children}
            </>
        );
    } 
        return <Navigate to="/login"></Navigate>
    
};

export default PrivateRouter;