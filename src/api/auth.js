import axios from 'axios'

function login() {
    console.log('logging in')
    axios.get('http://localhost:8081/login/chaseparks/1234').then(res => {
        console.log(res)
        localStorage.setItem('auth', res.data.auth)
        return true
    })

    return true
}

function signup() {
    console.log('signing up')
    axios.get('http://localhost:8081/signup/chaseparks/1234').then(res => {
        console.log(res)
    })
}

export {
    login,
    signup
}