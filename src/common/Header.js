import '../App.css'
import { logout } from '../redux/thunks/user'
import pageActions from '../redux/actions/pageActions'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'


const Header = () => {
    const dispatch = useDispatch()
    const authentication = useSelector(state => state.auth)
    const [showMenuOptions, setShowMenuOptions] = useState(false)

    return (
        <header>
            <div className="navbar navbar-light bg shadow-sm">
                <div className="container">
                    <div className="align-items-center d-flex navbar-brand pointer">
                        <strong onClick={() => dispatch(pageActions.updatePage({}, 0))}>Save Up</strong>
                    </div>
                        {
                            authentication.valid && (
                                <div className="dropdown">
                                    <button className="navbar-toggler" 
                                        type="button"
                                        data-toggle="dropdown"
                                        id="dropdownMenuButton"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        onClick={() => setShowMenuOptions(!showMenuOptions)}>
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className={showMenuOptions ? 'dropdown-menu-displayed w-100' : 'dropdown-menu w-100'}
                                            aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" href='./' onClick={async e => {
                                                e.preventDefault()
                                                dispatch(pageActions.updatePage({}, 0))
                                                setShowMenuOptions(false)
                                            }
                                        }>Savings Goals</a>
                                        <a className="dropdown-item" href='./' onClick={async e => {
                                                e.preventDefault()
                                                dispatch(pageActions.updatePage({}, 2))
                                                setShowMenuOptions(false)
                                            }
                                        }>Bank Accounts</a>
                                        <a className="dropdown-item" href='./' onClick={async e => {
                                                e.preventDefault()
                                                setShowMenuOptions(false)
                                            }
                                        }>My Profile</a>
                                        <a className="dropdown-item" href='./' onClick={async e => {                                            e.preventDefault()
                                                e.preventDefault()
                                                dispatch(logout())
                                                setShowMenuOptions(false)
                                            }
                                        }>Logout</a>
                                    </div>
                                </div>

                            ) 
                        }
                </div>
            </div>
        </header>
    )
}

export default Header