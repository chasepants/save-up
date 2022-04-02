import { LoginInputErrors, LoginInputs, SignupInputErrors, SignupInputs } from "../redux/types/loginPageTypes";

export const empty = (input: string|undefined): boolean => !input || input === ''; 

export const getLoginInputErrors = (login_inputs: LoginInputs): LoginInputErrors => {
    let errors: LoginInputErrors = { username: '', password: ''};
    if (empty(login_inputs.username)) {
      errors.username = 'Please enter a username';
    }

    if (empty(login_inputs.password)) {
      errors.password = 'Please enter a password';
    }

    return errors;
}

export const getSignupInputErrors = (signup_inputs: SignupInputs): SignupInputErrors => {
    let errors: SignupInputErrors = { username: '', password: '', confirm_password: '', firstname: '', lastname: '' };

    if (empty(signup_inputs.username)) {
        errors.username = 'Please enter a username';
    }

    if (empty(signup_inputs.password)) {
        errors.password = 'Please enter a password';
    }

    if (
        empty(signup_inputs.confirm_password) ||
        signup_inputs.confirm_password !== signup_inputs.password
    ) {
        errors.confirm_password = 'Please confirm the password';
    }

    if (empty(signup_inputs.firstname)) {
        errors.firstname = 'Please enter a first name';
    }

    if (empty(signup_inputs.lastname)) {
        errors.lastname = 'Please enter a last name';
    }

    return errors;
}