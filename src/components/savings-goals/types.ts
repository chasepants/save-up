import { ChangeEventHandler, MouseEventHandler } from "react";
import { BankAccount, PlaidItem, SavingsItem, User } from "../../library/types"

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

export type SavingsGoalAccountOptionProps = {
    account: BankAccount
}

export type AutomaticTransfersTitleProps = {
    length: number;
}

export type SavingsPlansInputProps = {
    plaid_items: Array<PlaidItem>;
    handleInput: ChangeEventHandler<any>;
}
