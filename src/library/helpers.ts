import { SavingsGoalInputErrors, SavingsGoalInputs } from '../library/types'
import { LoginInputErrors, LoginInputs, SignupInputErrors, SignupInputs } from '../library/types';

export const empty = (input: string|undefined): boolean => !input || input === ''; 

export const getLoginInputErrors = (login_inputs: LoginInputs) => {
    let errors: LoginInputErrors = { username: '', password: ''};
    let allErrorsEmpty = true;
    if (empty(login_inputs.username)) {
      errors.username = 'Please enter a username';
      allErrorsEmpty = false;
    }

    if (empty(login_inputs.password)) {
      errors.password = 'Please enter a password';
      allErrorsEmpty = false;
    }

    return { errors, allErrorsEmpty };
}

export const getSignupInputErrors = (signup_inputs: SignupInputs) => {
    let errors: SignupInputErrors = { username: '', password: '', confirm_password: '', firstname: '', lastname: '' };
    let allErrorsEmpty = true;
    if (empty(signup_inputs.username)) {
        errors.username = 'Please enter a username'; 
        allErrorsEmpty = false;
    }

    if (empty(signup_inputs.password)) {
        errors.password = 'Please enter a password';
        allErrorsEmpty = false;
    }

    if (
        empty(signup_inputs.confirm_password) ||
        signup_inputs.confirm_password !== signup_inputs.password
    ) {
        errors.confirm_password = 'Please confirm the password';
        allErrorsEmpty = false;
    }

    if (empty(signup_inputs.firstname)) {
        errors.firstname = 'Please enter a first name';
        allErrorsEmpty = false;
    }

    if (empty(signup_inputs.lastname)) {
        errors.lastname = 'Please enter a last name';
        allErrorsEmpty = false;
    }
    
    return { errors, allErrorsEmpty };
}

/**COPIED LOGIN PAGE Validate inputs and return a list of new errors since last form submit */
export const getSavingsGoalErrors = (savings_goal_inputs: SavingsGoalInputs, checkAutomaticTransferInputs: boolean) => {
    let errors: SavingsGoalInputErrors = {};
    let allErrorsEmpty = true;
    if (empty(savings_goal_inputs.name)) {
        errors.name = 'Please enter a name';
        allErrorsEmpty = false;
    }

    if (empty(savings_goal_inputs.description)) {
        errors.description = 'Please enter a description';
        allErrorsEmpty = false;
    }

    if (empty(savings_goal_inputs.amount)) {
        errors.amount = 'Please enter an amount';
        allErrorsEmpty = false;
    }

    if (empty(savings_goal_inputs.link)) {
        errors.link = 'Please enter a link';
        allErrorsEmpty = false;
    }

    if (checkAutomaticTransferInputs) {
        if(empty(savings_goal_inputs.fromAccount)) {
            errors.fromAccount = 'Please enter a link';
            allErrorsEmpty = false;
        }
        if(empty(savings_goal_inputs.toAccount)) {
            errors.fromAccount = 'Please enter an account to save to';
            allErrorsEmpty = false;
        }
        if(empty(savings_goal_inputs.savings_amount)) {
            errors.fromAccount = 'Please enter an amount to save';
            allErrorsEmpty = false;
        }
        if(empty(savings_goal_inputs.cadence)) {
            errors.fromAccount = 'Please enter a savings rate';
            allErrorsEmpty = false;
        }
    }

    return {errors, allErrorsEmpty};
}
