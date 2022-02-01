import {logout} from '../api/auth'

const Header = ({page, setPage, authentication}) => {
    const logUserOut = () => {
        logout()
        setPage({
            ...page,
            number: 0
        })
    }

    return (
        <header>
            <div className="navbar navbar-light bg shadow-sm">
                <div className="container">
                    <div className="navbar-brand d-flex align-items-center">
                        <strong>MANSLAVE</strong>
                    </div>
                    {
                        authentication.valid && <button className='btn btn-danger' onClick={() => logUserOut()}>Logout</button>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header 