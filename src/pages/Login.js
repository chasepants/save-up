import { useState } from 'react'
import { login, signup } from '../api/auth'

function Login({authentication, setAuthentication}) {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')

    const logUserIn = async () => {
        let auth = await login(username, password)
        console.log('Auth returned from login...' + auth)
        setAuthentication({
            ...authentication,
            valid: auth.valid,
            token: auth.token,
            error: auth.error,
            user: auth.user
        })
    }

    const signUserUp = async () => {
        let auth = await signup(username, password)
        console.log('Auth returned from login...' + auth)
        setAuthentication({
            ...authentication,
            valid: auth.valid,
            token: auth.token,
            error: auth.error,
            user: auth.user
        })
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
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="input-group flex-nowrap">
                                <input 
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    type="text"
                                    class="form-control" 
                                    placeholder="Username" 
                                    aria-label="Username" 
                                    aria-describedby="addon-wrapping"
                                />
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="input-group flex-nowrap">
                                <input
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    type="password" 
                                    class="form-control" 
                                    placeholder="Password"
                                    aria-label="Password"
                                    aria-describedby="addon-wrapping"
                                />
                            </div>
                        </li>
                        <li class="list-group-item d-flex justify-content-evenly px-5 py-2">
                            <button className="btn btn-primary" onClick={() => logUserIn()}>Login</button>
                            <button className="btn btn-primary" onClick={() => signUserUp()} >Signup</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='row mt-5'>
                <div className='col-sm-6 offset-sm-3 text-center'>
                    
                </div>
            </div>
            {(()=>{
                if (!authentication.valid) {
                    return (
                        <div className='row'>
                            <div className='col-sm-6 offset-sm-3 text-center'>
                                <p>{authentication.error}</p>
                            </div>
                        </div>
                    )
                }
            })()}
        </div>
    )
}

export default Login