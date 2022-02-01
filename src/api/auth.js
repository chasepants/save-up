import axios from 'axios'

async function login(username, password) {
    let response = await axios.get(`http://localhost:8081/login/${username}/${password}`).then(res => {
        console.log(res)
        localStorage.setItem('auth', res.data.auth)
        return {
            valid: true,
            token: res.data.auth,
            error: "",
            user: res.data.user
        }
    }).catch(err => {
        console.log(err)
        return {
            valid: false,
            token: "",
            error: "Incorrect username or password",
            user: {}
        }
    })

    return response;
}

function logout() {
    localStorage.removeItem('auth')
}

async function signup(username, password) {
    console.log('signing up')
    let response = await axios.get(`http://localhost:8081/signup/${username}/${password}`).then(res => {
        console.log(res)
        localStorage.setItem('auth', res.data.auth)
        return {
            valid: true,
            token: res.data.auth,
            error: "",
            user: res.data.user
        }
    }).catch(err => {
        console.log(err)
        return {
            valid: false,
            token: "",
            error: "Incorrect username or password",
            user: {}
        }
    })

    return response;
}

export {
    login,
    logout,
    signup
}