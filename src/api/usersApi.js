import axios from 'axios'

export default class UsersApi {
    LOGIN_END_POINT = 'login'
    SIGN_UP_END_POINT = 'signup'
    UPDATE_USER_END_POINT = 'update'

    constructor() {
        this.host = 'http://localhost'
        this.port = 8081
    }

    async updateUser(id, user, token) {
        return await axios.post(`${this.host}:${this.port}/${this.UPDATE_USER_END_POINT}/${id}`, user, { headers: { 'authorization': token} })
    }

    async login(username, password) {
        return await axios.get(`${this.host}:${this.port}/${this.LOGIN_END_POINT}/${username}/${password}`)
    }

    async signup(user) {
        return await axios.post(`${this.host}:${this.port}/${this.SIGN_UP_END_POINT}`, user)
    }
}
