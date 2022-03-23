import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { User } from '../utils/types'

export default class UsersApi {
    LOGIN_END_POINT = 'login'
    SIGN_UP_END_POINT = 'signup'
    UPDATE_USER_END_POINT = 'update'

    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: 'localhost:3000'
        });
    }
     
    async updateUser(id: string, user: User, token: string): Promise<AxiosResponse> {
        return await this.client.post(`/${this.UPDATE_USER_END_POINT}/${id}`, user, { headers: { 'authorization': token} })
    }

    async login(username: string, password: string): Promise<AxiosResponse> {
        return await this.client.get(`/${this.LOGIN_END_POINT}/${username}/${password}`)
    }

    async signup(user: User): Promise<AxiosResponse> {
        return await this.client.post(`/${this.SIGN_UP_END_POINT}`, user)
    }
}
