const locateAccounts = (plaid_items, page) => {
    let fromAccount = {}
    let toAccount = {}
    
    if (plaid_items.length) {
        plaid_items.map(plaidItem => {
            plaidItem.accounts.map(bankAccount => {
                if (bankAccount.account_id === page.item.saving_plan.fromAccount) 
                    fromAccount = bankAccount
                if (bankAccount.account_id === page.item.saving_plan.toAccount) 
                    toAccount = bankAccount
                return
            })
            return 
        })
    }

    return [fromAccount, toAccount]
}

export {
    locateAccounts
}