import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/reducers';

function RequireAuth({ children }: any): JSX.Element {
    let auth = useSelector((state: RootState) => state.auth);
    let location = useLocation();
  
    if (!auth.valid) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      console.log('not logged in')
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
}

export default RequireAuth