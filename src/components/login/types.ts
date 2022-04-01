export type FormInputProps = {
    label: string;
    name: string;
    type: string;
    handleInput: any;
}

export type FormButtonProps = {
    handleFormSubmit: any;
    formButtonText: string;
}

export type FormLinkProps = {
    handleFormSwitch: any;
    formBottomText: string;
}

export type FormErrorProps = {
    error: string;
}
