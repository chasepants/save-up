/** THIS MODULE CONTAINS HELPER FUNCTIONS WHEN PARSING USER DATA */
import { PlaidItem, SavingsItem, BankAccount } from './types'

const locateAccounts = (plaid_items: Array<PlaidItem>, item: SavingsItem): Array<BankAccount> => {
    let fromAccount: BankAccount;
    let toAccount: BankAccount;
    console.log(item.saving_plan.from_account_id)
    console.log(item.saving_plan.to_account_id)

    if (plaid_items.length) {
        plaid_items.forEach(plaidItem => {
            plaidItem.accounts.forEach(bankAccount => {
                if (bankAccount.account_id === item.saving_plan.from_account_id) 
                    fromAccount = bankAccount
                if (bankAccount.account_id === item.saving_plan.to_account_id) 
                    toAccount = bankAccount
                return bankAccount
            })
            return plaidItem
        })
    }

    return [fromAccount, toAccount]
}

const findSavingsItemByName = (needle: string, items: Array<SavingsItem>): SavingsItem => {
    let matchedItem: SavingsItem;
    console.log('looking for');
    console.log(needle)
    console.log('in')
    console.log(items)
    items.forEach(item => {
        if (item.name === needle) {
            console.log('matched!')
            matchedItem = item
            return
        }
    });

    return matchedItem
}

export {
    locateAccounts,
    findSavingsItemByName
}