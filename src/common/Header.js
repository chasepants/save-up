import { logout } from '../redux/thunks/user'
import pageActions from '../redux/actions/pageActions'
import { useSelector, useDispatch } from 'react-redux'


const Header = () => {
    const dispatch = useDispatch()
    const authentication = useSelector(state => state.auth)

    return (
        <header>
            <div className="navbar navbar-light bg shadow-sm">
                <div className="container">
                    <div className="navbar-brand d-flex align-items-center">
                        <strong onClick={() => dispatch(pageActions.updatePage({}, 0))}>Save Up</strong>
                    </div>
                    <div>
                    {
                        authentication.valid && 
                        <button className='btn btn-secondary' onClick={() => dispatch(pageActions.updatePage({}, 2))}>Accounts</button>
                    }
                    {
                        authentication.valid && <button className='btn btn-danger' onClick={() => dispatch(logout())}>Logout</button>
                    }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header