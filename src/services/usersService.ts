import axios from "axios";
import UsersApi from "../api/usersApi";
import { PlaidItem, SavingsItem, User } from "../utils/types";
 
export default class UsersService {
    private usersApi: UsersApi;

    constructor(usersApi: UsersApi) {
        this.usersApi = usersApi;
    }

    async login(username: string, password: string): Promise<User> {
        try {
            return (await this.usersApi.login(username, password)).data;
        } catch(error) {
            let msg = axios.isAxiosError(error) ? 'Incorrect username or password' : 'Something went wrong, please try again';
            throw new Error(msg);
        }
    }

    async signup(username: string, password: string, name: string): Promise<User> {
        try { 
            return (await this.usersApi.register(username, password, name)).data;
        } catch(error) {
            let msg = axios.isAxiosError(error) ? 'Username taken' : 'Something went wrong, please try again';
            throw new Error(msg);
        }
    }

    async logout(): Promise<void> {
        try {
            await this.usersApi.logout();
        } catch (error) {
            console.error(error);
        }
    }

    async addUserSavingsItem(id: string, savings_item: SavingsItem): Promise<User> {
        try {
            console.log(id)
            return (await this.usersApi.addUserSavingsItems(id, savings_item)).data;
        } catch(error) {
            console.log(error);
        }
    }

    async removeUserSavingsItems(id: string, savings_item: SavingsItem): Promise<User> {
        try {
            return (await this.usersApi.removeUserSavingsItems(id, savings_item)).data;
        } catch(error) {
            console.log(error);
        }
    }

    async addUserPlaidItem(id: string, plaidItem: PlaidItem): Promise<User> {
        try {
            return (await this.usersApi.addUserPlaidItem(id, plaidItem)).data;
        } catch(error) {
            console.log(error);
        }
    }
}
