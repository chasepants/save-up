import { ChangeEventHandler } from "react";

export type FormButtonProps = {
    formButtonText: string;
    handleFormSubmit: any;
    form: string;
    showCustomButton: boolean;
    customButton: JSX.Element;
    error: string;
}


export type FormDropDownProps = {
    handleInput: ChangeEventHandler<any>;
    name: string; 
    label: string;
    detail: string;
    options: Array<JSX.Element>;
    error: string
}

export type FormInputProps = {
    label: string;
    name: string;
    type: string;
    handleInput: any;
    error: string;
}

export type FormErrorProps = {
    error: string;
}
