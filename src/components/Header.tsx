import '../App.css'
import * as user from '../redux/thunks/user'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { RootState } from '../redux/reducers'

type DropDownItemProps = {
    label: string,
    handleLinkClick: Function,
    path: string
}

export function DropDownItem({label, handleLinkClick, path}: DropDownItemProps): JSX.Element {
    return (
        <a className="dropdown-item" href='./' onClick={e => handleLinkClick(e, path)}>
            { label }
        </a>
    )
}

export function Logo(): JSX.Element {
    const navigate: NavigateFunction = useNavigate()

    return (
        <div className="align-items-center d-flex navbar-brand pointer"> 
            <strong onClick={() => {
                navigate('/goals', { replace: true })
            }}>Save Up</strong> 
        </div>
    )
}

function Header(): JSX.Element {
    const dispatch = useDispatch()
    const navigate: NavigateFunction = useNavigate()

    const authentication = useSelector((state: RootState) => state.auth)
    const [showMenuOptions, setShowMenuOptions] = React.useState(false)

    const handleLinkClick = async (event: MouseEvent, link: string) => {
        event.preventDefault()
        navigate(link, { replace: true });
        setShowMenuOptions(false)
    }

    const handleLogout = async (event: MouseEvent) => {
        event.preventDefault()
        dispatch(user.logout())
        setShowMenuOptions(false)
    }

    return authentication.valid ? (
        <header>
            <div className="navbar navbar-light bg shadow-sm">
                <div className="container">
                    <Logo/>
                    <div className="dropdown">
                        <button className="navbar-toggler" onClick={() => setShowMenuOptions(!showMenuOptions)}>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className={showMenuOptions ? 'dropdown-menu-displayed w-100' : 'dropdown-menu w-100'}>
                            <DropDownItem label={'Savings Goals'} handleLinkClick={handleLinkClick} path={'goals'}/>
                            <DropDownItem label={'Bank Accounts'} handleLinkClick={handleLinkClick} path={'bank-accounts'}/>
                            <DropDownItem label={'My Profile'} handleLinkClick={handleLinkClick} path={'goals'}/>
                            <DropDownItem label={'Logout'} handleLinkClick={handleLogout} path={'logout'}/>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    ) : <div></div>
}

export default Header
