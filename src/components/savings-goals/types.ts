import { ChangeEventHandler, MouseEventHandler } from "react";
import { BankAccount, PlaidItem, SavingsItem, User } from "../../utils/types"

export type RequiredSavingsGoalInputs = {
    goal: string;
    description: string;
    amount: string;
    link: string;
}

export type RequiredTransferInputs = RequiredSavingsGoalInputs & {
    transfer_from_id: string;
    transfer_to_id: string;
    savings_amount: string;
    savings_rate: string;
}

export type SavingsItemProps = {
    item: SavingsItem;
}

export type SavingsItemPlanProps = {
    item: SavingsItem;
    fromAccount: BankAccount|{};
    toAccount: BankAccount|{};
}

export type SavingsGoalErrorProps = {
    itemForm: any
}

export type SavingsGoalAddButtonProps = {
    user: User;
    itemForm: any
}

export type FormButtonProps = {
    handleFormSubmit: MouseEventHandler<HTMLButtonElement>;
    isSaving: boolean;
    itemForm: any;
    items: Array<SavingsItem>
}

export type SavingsGoalAccountOptionProps = {
    account: BankAccount
}

export type SavingsPlanAccountDropDownProps = {
    handleInput: ChangeEventHandler<any>;
    name: string; 
    label: string;
    plaid_items: Array<PlaidItem>;
    detail: string;
    errors: RequiredTransferInputs|RequiredSavingsGoalInputs
}

export type AutomaticTransfersTitleProps = {
    length: number;
}

export type SavingsPlansInputProps = {
    plaid_items: Array<PlaidItem>;
    handleInput: ChangeEventHandler<any>;
    errors: RequiredTransferInputs|RequiredSavingsGoalInputs
}
