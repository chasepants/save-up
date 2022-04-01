import { Navigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/reducers';
import authActions from '../redux/actions/authActions';

function RequireAuth({ children }: any): JSX.Element {
    let auth = useSelector((state: RootState) => state.auth);
    let user = useSelector((state: RootState) => state.user);
    let location = useLocation();
    const dispatch = useDispatch()

    if (!user.username) {
      dispatch(authActions.clearAuth())
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