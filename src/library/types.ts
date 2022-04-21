export type User = {
    _id?: string,
    username: string;
    name: string;
    plaid_items: Array<PlaidItem>;
    savings_items: Array<SavingsItem>;
}

/** PLAID ITEM TYPES */
export type PlaidItem = {
    request_id: string;
    accounts: Array<BankAccount>;
    item: Item; 
}

export type BankAccount = {
    account_id: string;
    balances: Array<Balance>;
    mask: string;
    name: string;
    official_name: string;
    type: string;
    subtype: string;
}

export type Item = {    
    available_products: Array<string>;
    billed_products: Array<string>;
    consent_expiration_time: string;
    error: string;
    institution_id: string;
    item_id: string;
    products: Array<string>;
    update_type: string;
    webhook: string;
}

export type Balance = {  
    available: Number;
    current: Number;
    iso_currency_code: string;
    limit: Number;
    unofficial_currency_code: string;
}

/** SAVINGS ITEMS TYPES */
export type SavingsItem = {
    name?: string;  
    description?: string;  
    amount?: number;  
    url?: string;  
    saving_plan?: SavingPlan;  
    item_preview?: ItemPreview;
}

export type SavingPlan = {  
    from_account_id?: string;
    to_account_id?: string;
    amount?: Number;
    cadence?: string;
}

export type ItemPreview = {    
    title?: string;
    description?: string;
    domain?: string;
    img?: string;
    favicon?: string;
}

/** LOGIN PAGE */

/** INTERFACES */
export interface LoginInputErrors { username?: string, password?: string}
export interface SignupInputErrors { username?: string, password?: string, confirm_password?: string, firstname?: string, lastname?: string }

/** TYPES */
export type LoginInputs = { username?: string, password?: string}
export type SignupInputs = { username?: string, password?: string, confirm_password?: string, firstname?: string, lastname?: string }

/** HELPERS FOR TYPES */
export function getLoginInputErrorByKey(key: string, errors: LoginInputErrors) {
    if (!errors) {
        return '';
    }
    switch(key) {
      case 'username':
          return errors.username ?? '';
      case 'password':
          return errors.password ?? '';
      default:
          return '';
    }
}
  
export function getSignupInputErrorByKey(key: string, errors: SignupInputErrors) {
    if (!errors) {
        return '';
    }
    switch(key) {
      case 'username':
          return errors.username ?? '';
      case 'password':
          return errors.password ?? '';
      case 'confirm_password':
          return errors.confirm_password ?? '';
      case 'firstname':
          return errors.firstname ?? '';
      case 'lastname':
          return errors.lastname ?? '';
      default:
        return '';
    }
}

/** SAVINGS GOAL FORM */

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
            return errors.amount ?? '';
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
