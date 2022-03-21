const locateAccounts = (plaid_items, item) => {
    let fromAccount = {}
    let toAccount = {}
    
    if (plaid_items.length) {
        plaid_items.map(plaidItem => {
            plaidItem.accounts.map(bankAccount => {
                if (bankAccount.account_id === item.saving_plan.fromAccount) 
                    fromAccount = bankAccount
                if (bankAccount.account_id === item.saving_plan.toAccount) 
                    toAccount = bankAccount
                return bankAccount
            })
            return plaidItem
        })
    }

    return [fromAccount, toAccount]
}

const findSavingsItemByName = (needle, items) => {
    let matchedItem = {};
    items.forEach(item => {
        if (item.name === needle) {
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