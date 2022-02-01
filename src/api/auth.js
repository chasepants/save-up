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

async function updateUserItems(username, password, items) {
    let user = {
        username: username,
        password: password,
        items: items
    }
    let response = await axios.post(`http://localhost:8081/update/${username}/${password}`, user).then(res => {
        return res
    }).catch(err => {
        return err
    })
    console.log(response)

    return response;
}

export {
    login,
    logout,
    signup,
    updateUserItems
}