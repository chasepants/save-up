import { Action } from 'redux'
import { SavingsItem } from '../../library/types'

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

export const getUpdateObj = (savings_goal_inputs: SavingsGoalInputs): SavingsItem => {
    let amount: string = savings_goal_inputs.amount ?? '0'
    let saving_amount: string = savings_goal_inputs.savings_amount ?? '0'

    return {
        name: savings_goal_inputs.name,
        description: savings_goal_inputs.description,
        amount: Number.parseFloat(amount),
        url: savings_goal_inputs.link,
        saving_plan: {
            from_account_id: savings_goal_inputs.fromAccount,
            to_account_id: savings_goal_inputs.toAccount,
            amount: Number.parseFloat(saving_amount),
            cadence: savings_goal_inputs.cadence
        }
    }
}
