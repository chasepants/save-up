import { useLocation, Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/reducers';

function AuthListener({ children }: any): JSX.Element {
    let auth = useSelector((state: RootState) => state.auth);
    let location = useLocation();
  
    if (auth.valid) {
      return <Navigate to="/goals" state={{ from: location }} replace />;
    }
  
    return children;
}

export default AuthListener