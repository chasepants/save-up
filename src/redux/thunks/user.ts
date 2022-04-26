import { PlaidItem, SavingsItem, User } from '../../library/types'
import UsersService from '../../library/usersService'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface LoginArgs {
    username: string, 
    password: string
}

interface SignupArgs { 
    username: string,
    password: string,
    confirm_password: string,
    firstname: string,
    lastname: string 
}

interface UpdatePlaidItemArgs {
    userId: string,
    plaidItem: PlaidItem
}

interface UpdateSavingsdItemArgs {
    userId: string,
    savingsItem: SavingsItem
}

export const updateUserPlaidItemsThunk = createAsyncThunk<User, UpdatePlaidItemArgs, { extra: UsersService }>(
    'user/updatePlaidItems', 
    async (args, { extra: usersService }) => {
        let updatedUser = await usersService.addUserPlaidItem(args.userId, args.plaidItem);
        updatedUser._id = args.userId;
        localStorage.removeItem('state');
        return updatedUser;
    }
)

export const updateUserItemsThunk = createAsyncThunk<User, UpdateSavingsdItemArgs, { extra: UsersService }>(
    'user/updateSavingItems', 
    async (args, { extra: usersService }) => {
        let updatedUser = await usersService.addUserSavingsItem(args.userId, args.savingsItem);
        updatedUser._id = args.userId;
        localStorage.removeItem('state');
        return updatedUser;
    }
)

export const removeUserItemThunk = createAsyncThunk<User, UpdateSavingsdItemArgs, { extra: UsersService }>(
    'user/removeUserItem', 
    async (args, { extra: usersService }) => {
        let updatedUser = await usersService.removeUserSavingsItems(args.userId, args.savingsItem);
        updatedUser._id = args.userId;
        return updatedUser;
    }
)

export const loginThunk = createAsyncThunk<User, LoginArgs, { extra: UsersService }>(
    'user/login', 
    async (args, { extra: usersService }) => {
        return await usersService.login(args.username, args.password);
    }
)

export const signupThunk = createAsyncThunk<User, SignupArgs, { extra: UsersService }>(
    'user/signup', 
    async (args, { extra: usersService }) => {
        const name = `${args.firstname} ${args.lastname}`;
        return await usersService.signup(args.username, args.password, name);
    }
)

export const logoutThunk = createAsyncThunk<void, {}, { extra: UsersService }>(
    'user/logout', 
    async (args, { extra: usersService }) => {
        await usersService.logout();
        localStorage.removeItem('state');
    }
)