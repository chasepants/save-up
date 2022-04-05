import { Action } from 'redux'

/** INTERFACE */
export interface SavingsGoalInputErrors { 
    name?: string;
    description?: string;
    amount?: string;
    link?: string;
    fromAccount?: string;
    toAccount?: string;
    savings_amount?: string;
    cadence?: string
};

/** TYPES */
export type AddSavingsGoalItemAction = Action & {payload: AddSavingsGoalItemActionPayload};
export type DefaultAddSavingsGoalItem = { 
    show_form: boolean,
    savings_goal_inputs: SavingsGoalInputs, 
    savings_goal_input_errors: SavingsGoalInputErrors, 
    add_error: string, 
    remove_error: string,
    isSaving: boolean
};
export type AddSavingsGoalItemActionPayload = Action & DefaultAddSavingsGoalItem;

export type SavingsGoalInputs = { 
    name?: string;
    description?: string;
    amount?: string;
    link?: string;
    fromAccount?: string;
    toAccount?: string;
    savings_amount?: string;
    cadence?: string
};

/** HELPERS FOR TYPES */
export const getAddGoalFormErrorByKey = (key: string, errors: SavingsGoalInputErrors): string => {
    if (!errors) {
        return '';
    }

    switch(key) {
        case 'name':
            return errors.name ?? '';
        case 'description':
            return errors.description ?? '';
        case 'link':
            return errors.link ?? '';
        case 'amount':
            return errors.link ?? '';
        case 'savings_amount':
            return errors.savings_amount ?? '';
        case 'fromAccount':
            return errors.fromAccount ?? '';
        case 'toAccount':
            return errors.toAccount ?? '';
        case 'cadence':
            return errors.cadence ?? '';
    }

    return '';
}
