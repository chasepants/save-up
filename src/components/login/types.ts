export type FormInputProps = {
    label: string;
    name: string;
    type: string;
    errors: SignupErrors|LoginErrors;
    handleInput: Function;
}

export type FormButtonProps = {
    handleFormSubmit: Function;
    isSaving: boolean;
    formButtonText: string;
}

export type FormLinkProps = {
    handleFormSwitch: Function;
    formBottomText: string;
}

export type FormErrorProps = {
    error: string;
}

/** STATE TYPES */
export type LoginInputs = {
    username: string;
    password: string;
}

export type SignupInputs = LoginInputs & {
    firstname: string;
    lastname: string;
    confirm_password: string;
}

export type LoginErrors = {
    username: string;
    password: string;
}

export type SignupErrors = LoginErrors & {
    firstname: string;
    lastname: string;
    confirm_password: string;
}
