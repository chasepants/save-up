const validateItem = item => {
    console.log(item)
    if (
        item.name === ""  ||
        item.amount === 0 ||
        item.saving_plan === {}
    ) {
        return false
    }
    
    if (
        item.saving_plan.bank === ""  ||
        item.saving_plan.amount === 0 ||
        item.saving_plan.cadence === 0
    
    ) {
        return false
    }
            
    return true
}

export {
    validateItem
}