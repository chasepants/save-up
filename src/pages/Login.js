import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, signup } from '../redux/thunks/user'

function Login() {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    const authentication = useSelector(state => state.auth)
    const dispatch = useDispatch()

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-sm-6 offset-sm-3 text-center'>
                    <h3>Login</h3>
                </div>
            </div>
            <div className='row mt-5'>
                <div className='col-sm-6 offset-sm-3 text-center'>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <div className="input-group flex-nowrap">
                                <input 
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    type="text"
                                    className="form-control" 
                                    placeholder="Username"
                                />
                            </div>
                        </li>
                        <li className="list-group-item">
                            <div className="input-group flex-nowrap">
                                <input
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Password"
                                />
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-evenly px-5 py-2">
                            <button className="btn btn-primary" onClick={() => dispatch(login(username, password))}>Login</button>
                            <button className="btn btn-primary" onClick={() => dispatch(signup(username, password))} >Signup</button>
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