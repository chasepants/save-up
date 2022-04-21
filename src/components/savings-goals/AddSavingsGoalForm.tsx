import { updateUserItems } from '../../redux/thunks/user'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Form  } from 'react-bootstrap'
import { RootState } from '../../redux/store'
import { AutomaticTransfersTitleProps, SavingsGoalAccountOptionProps, SavingsPlansInputProps } from './types'
import { getSavingsGoalErrors } from '../../library/helpers'
import { FormButton, FormDropDown, FormError, FormInput } from '../common/forms'
import { PlaidItem, getUpdateObj, SavingsGoalInputErrors, getAddGoalFormErrorByKey } from '../../library/types'
import { hideForm, updateFormInputErrors, updateFormInputs, toggleFormIsSaving, setAddGoalFormError, setRemoveGoalFormError, clearForm } from '../../redux/reducers/savingsGoalForm'
import { useEffect } from 'react'

function getPlaidItemAccounts(plaid_items: Array<PlaidItem>) {
    const accountOptions: Array<JSX.Element> = [];
    plaid_items.forEach(plaidItem => {
        plaidItem.accounts.forEach(account => accountOptions.push(<AccountOption key={account.account_id} account={account}/>));
    });
    return accountOptions;
}

function AccountOption({ account }: SavingsGoalAccountOptionProps ): JSX.Element {
    return (
        <option key={account.account_id} value={account.account_id}>
            {account.name}
        </option>
    )
}

export function AutomaticTransfersSectionTitle({ length }: AutomaticTransfersTitleProps): JSX.Element {
    return (
        <div className='col-sm-12'>
            <h5>Saving's Plan - Set Up Automatic Transfers</h5>
            {length === 0 && <span className='text-muted'>Only available after linking more than one bank account</span>}
        </div>
    )
}

export function AddSavingsPlanInputs({plaid_items, handleInput}: SavingsPlansInputProps): JSX.Element {
    const savingsRateOptions: Array<JSX.Element> = [
        <option key='' value='Every'>Every</option>,
        <option key='daily' value='daily'>Day</option>,
        <option key='weekly' value='weekly'>Week</option>,
        <option key='bi-weekly' value='bi-weekly'>Other Week</option>,
        <option key='monthly' value='monthly'>Month</option>,
        <option key='quarterly' value='quarterly'>3 Months</option>,
        <option key='semi-annually' value='semi-annually'>6 Months</option>,
        <option key='annually' value='annually'>Year</option>
    ]

    const itemForm = useSelector((state: RootState) => state.savingsGoalForm)
    const savings_amount_error = getAddGoalFormErrorByKey('savings_amount', itemForm.savings_goal_input_errors);
    const from_account_error = getAddGoalFormErrorByKey('fromAccount', itemForm.savings_goal_input_errors);
    const to_account_error = getAddGoalFormErrorByKey('toAccount', itemForm.savings_goal_input_errors);
    const cadence_error = getAddGoalFormErrorByKey('cadence', itemForm.savings_goal_input_errors);
    const accountOptions: Array<JSX.Element> = getPlaidItemAccounts(plaid_items);

    return plaid_items.length > 0 ? (
        <>
            <div className='col-sm-1'>
                <span>TRANSFER:</span>    
            </div>
            <FormInput label='Add A Savings Amount' name='savings_amount' type='text' handleInput={handleInput} error={savings_amount_error}/>
            <FormDropDown 
                handleInput={handleInput} name={'fromAccount'} label='From' detail='From which account?' error={from_account_error} options={accountOptions}/>
            <FormDropDown 
                handleInput={handleInput} name={'toAccount'} label='To' detail='To which account?' error={to_account_error} options={accountOptions}/>
            <FormDropDown 
                handleInput={handleInput} name={'cadence'} label='Savings Rate' detail='How often?' error={cadence_error} options={savingsRateOptions}/>
        </>
    ) : <div></div>
}

function AddSavingsGoalForm(): JSX.Element {
    const items = useSelector((state: RootState) => state.user.savings_items)
    const itemForm = useSelector((state: RootState) => state.savingsGoalForm)
    const plaid_items = useSelector((state: RootState) => state.user.plaid_items)
    const dispatch = useDispatch()

    const handleInput = (e: any) => {
        let key: keyof SavingsGoalInputErrors = (e.target.name as keyof SavingsGoalInputErrors)
 
        dispatch(updateFormInputs({
            ...itemForm.savings_goal_inputs,
            [e.target.name]: e.target.value,
        }))
    
        //check for previous error, reset error for new input
        if (!!itemForm.savings_goal_input_errors[key]) {
            dispatch(updateFormInputErrors({
                ...itemForm.savings_goal_input_errors,
                [e.target.name]: '',
            }))
        }
    }

    const handleFormSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        dispatch(setAddGoalFormError(''));
        dispatch(setRemoveGoalFormError(''));

        const { errors, allErrorsEmpty } = getSavingsGoalErrors(itemForm.savings_goal_inputs, plaid_items.length > 0);
        if (!allErrorsEmpty) {
            dispatch(updateFormInputErrors(errors));
            return;
        }
        dispatch(toggleFormIsSaving())
        dispatch(updateUserItems(getUpdateObj(itemForm.savings_goal_inputs)))
    }
    
    const name_error = getAddGoalFormErrorByKey('name', itemForm.savings_goal_input_errors);
    const description_error = getAddGoalFormErrorByKey('description', itemForm.savings_goal_input_errors);
    const link_error = getAddGoalFormErrorByKey('link', itemForm.savings_goal_input_errors);
    const amount_error = getAddGoalFormErrorByKey('amount', itemForm.savings_goal_input_errors);
    console.log(amount_error)
    const customButton = (
        <Button onClick={() => dispatch(hideForm())} className="btn-sharp btn-warning">
            Close
        </Button>
    ); 

    return (
        <div className="row mb-5">
            <div className="col-sm-10 offset-sm-1 border mb-5">
                <div className='row mt-5 text-center'>
                    <h3>Add A Saving's Goal</h3>
                </div>
                <Form className='row g-3 mt-3'>
                    <FormInput label='Add A Name' name='name' type='text' handleInput={handleInput} error={name_error}/>
                    <FormInput label='Add A Description' name='description' type='text' handleInput={handleInput} error={description_error}/>
                    <FormInput label='Add A Link' name='link' type='text' handleInput={handleInput} error={link_error}/>
                    <FormInput label='Add A Goal Amount' name='amount' type='text' handleInput={handleInput} error={amount_error}/>
                    <AutomaticTransfersSectionTitle length={plaid_items.length}/>
                    <AddSavingsPlanInputs plaid_items={plaid_items} handleInput={handleInput} />
                    <FormButton 
                        formButtonText='Save'
                        error={itemForm.add_error}
                        handleFormSubmit={handleFormSubmit}
                        showCustomButton={ items.length > 0}
                        customButton={customButton}
                        form='addSavingsGoalForm'/>
                        {'' !== itemForm.add_error && <FormError error={itemForm.add_error}/>}
                </Form>
            </div>
        </div>
    )
}

export default AddSavingsGoalForm;
