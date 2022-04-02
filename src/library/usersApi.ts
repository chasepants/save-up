import axios, { AxiosResponse } from 'axios'
import { PlaidItem, SavingsItem } from './types'

export default class UsersApi {
    LOGIN_END_POINT = '/authentication/login';
    LOGOUT_END_POINT = '/authentication/logout';
    SIGN_UP_END_POINT = '/authentication/register';
    UPDATE_USER_PLAID_ITEMS_END_POINT = '/users/add_plaid_item';
    UPDATE_USER_SAVINGS_ITEM_END_POINT = '/users/add_savings_item';
    REMOVE_SAVINGS_ITEM_END_POINT = '/users/remove_savings_item';

    constructor() {
        axios.defaults.withCredentials = true;
    }

    async login(username: string, password: string): Promise<AxiosResponse> {
        return axios.post(`${this.LOGIN_END_POINT}`, { username, password })
    }

    async register(username: string, password: string, name: string): Promise<AxiosResponse> {
        return axios.post(`${this.SIGN_UP_END_POINT}`, { username, password, name })
    }

    async logout(): Promise<AxiosResponse> {
        return axios.post(`${this.LOGOUT_END_POINT}`)
    } 

    async addUserSavingsItems(id: string, savings_item: SavingsItem): Promise<AxiosResponse> {
        return axios.patch(`${this.UPDATE_USER_SAVINGS_ITEM_END_POINT}/${id}`, savings_item)
    }

    async removeUserSavingsItems(id: string, savings_item: SavingsItem): Promise<AxiosResponse> {
        return axios.patch(`${this.REMOVE_SAVINGS_ITEM_END_POINT}/${id}`, savings_item)
    }

    async addUserPlaidItem(id: string, item: PlaidItem): Promise<AxiosResponse> {
        return axios.patch(`${this.UPDATE_USER_PLAID_ITEMS_END_POINT}/${id}`, item )
    }
}
