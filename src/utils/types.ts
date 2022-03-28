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
    name: string;  
    description: string;  
    amount: number;  
    url: string;  
    saving_plan: SavingPlan;  
    item_preview: ItemPreview;
}

export type SavingPlan = {  
    from_account_id: string;
    to_account_id: string;
    amount: Number;
    cadence: string;
}

export type ItemPreview = {    
    title: string;
    description: string;
    domain: string;
    img: string;
    favicon: string;
}
