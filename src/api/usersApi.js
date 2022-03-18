import axios from 'axios'

export default class UsersApi {
    async updateUser(id, user, token) {
        return await axios.post(`http://localhost:8081/update/${id}`, user, { headers: { 'authorization': token} })
    }

    async login(username, password) {
        return await axios.get(`http://localhost:8081/login/${username}/${password}`)
    }

    async signup(user) {
        return await axios.post(`http://localhost:8081/signup`, user)
    }
}