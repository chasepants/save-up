import { login, signup } from '../api/auth'

function Login({setAuthentication}) {

    const logUserIn = () => {
        let res = login()
    setAuthentication(res)
    }

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-sm-6 offset-sm-3 text-center'>
                    <h3>Login</h3>
                </div>
            </div>
            <div className='row mt-5'>
                <div className='col-sm-6 offset-sm-3 text-center'>
                    <button className="btn btn-primary" onClick={() => logUserIn() }>Login</button>
                    <button className="btn btn-primary" onClick={() => signup() } >Signup</button>
                </div>
            </div>
        </div>
    )
}

export default Login