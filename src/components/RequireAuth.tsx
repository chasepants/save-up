import { Navigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store';
import { clearAuth } from '../redux/reducers/auth';

function RequireAuth({ children }: any): JSX.Element {
    const auth = useSelector((state: RootState) => state.auth);
    const user = useSelector((state: RootState) => state.user);
    const location = useLocation();
    const dispatch = useDispatch()

    if (!user.username) {
      dispatch(clearAuth())
    }

    if (!auth.valid) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
}

export default RequireAuth
