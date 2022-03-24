import { updateUserItems } from '../../redux/thunks/user'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import addSavingsGoalFormActions from '../../redux/actions/addSavingsGoalFormActions'
import ClipLoader from 'react-spinners/ClipLoader'
import { Button, Form  } from 'react-bootstrap'
import { RootState } from '../../redux/reducers'
import { FormErrorProps, FormInputProps } from '../login/types'
import { AutomaticTransfersTitleProps, FormButtonProps, SavingsGoalAccountOptionProps, SavingsPlanAccountDropDownProps, SavingsPlansInputProps } from './types'
import { SavingsGoalInputErrors } from '../../redux/reducers/addSavingsGoalFormReducer'

/** STOLEN FROM LOGINPAGE.JS */
function FormInput(props: FormInputProps): JSX.Element {
//   const showFormText = !!props['FormText']
    const {label, name, type, handleInput} = props
    const itemForm = useSelector((state: RootState) => state.addSavingsGoalForm)

    return (
        <Form.Group className='col-sm-6'>
        <Form.Label>{label}</Form.Label>
        <Form.Control
            name={name}
            type={type}
            onChange={(e) => handleInput(e)}
            isInvalid={!!itemForm.savings_goal_input_errors[name]}
        />
        {/* {showFormText ? <FormText/> : ''}  */}
        <Form.Control.Feedback type="invalid">
            {itemForm.savings_goal_input_errors[name]}
        </Form.Control.Feedback>
        </Form.Group>
    )
}

/** STOLEN FROM LOGINPAGE.JS */
function FormButton({handleFormSubmit, isSaving, itemForm, items}: FormButtonProps): JSX.Element {
    const dispatch = useDispatch()
    return (
        <Form.Group className='col-sm-6 offset-sm-3 text-center mb-5'>
            <div className="input-group d-flex justify-content-evenly">
                <Button onClick={handleFormSubmit} className="btn-sharp btn-success">
                    { isSaving && '' === itemForm.add_error ? <ClipLoader color="#ffffff" loading={isSaving} size={20} /> : "Save" } 
                </Button>
                {
                    items.length > 0 && (
                        <Button onClick={() => dispatch(addSavingsGoalFormActions.hideAddSavingsGoalForm())} className="btn-sharp btn-warning">
                            Close
                        </Button>
                    )
                }
            </div>
        </Form.Group>
    )
}

/** STOLEN FROM LOGINPAGE.JS */
function FormError({error}: FormErrorProps): JSX.Element {
    return (
      <div className="row mt-2">
        <div className="col-sm-6 offset-sm-3 text-center">
          <Form.Text className='text-danger'>{error}</Form.Text>
        </div>
      </div>
    )
}

function AccountOption({ account }: SavingsGoalAccountOptionProps ): JSX.Element {
    return (
        <option key={account.account_id} value={account.account_id}>
            {account.name}
        </option>
    )
}

function SavingsPlanAccountDropDown({handleInput, name, label, plaid_items, detail}: SavingsPlanAccountDropDownProps): JSX.Element {
    const itemForm = useSelector((state: RootState) => state.addSavingsGoalForm)

    return (
        <Form.Group className='col-sm-3'>
            <Form.Control onChange={handleInput} as='select' name={name} isInvalid={!!itemForm.savings_goal_input_errors[name]}>
                <option value=''>{label}</option>
                {plaid_items.map(plaidItem => plaidItem.accounts.map(account => <AccountOption account={account} />))}
            </Form.Control>
            <span className='text-muted'>{detail}</span>
            <Form.Control.Feedback type="invalid">
                {itemForm.savings_goal_input_errors[name]}
            </Form.Control.Feedback>
        </Form.Group>
    )
} 

function AutomaticTransfersSectionTitle({ length }: AutomaticTransfersTitleProps): JSX.Element {
    return (
        <div className='col-sm-12'>
            <h5>Saving's Plan - Set Up Automatic Transfers</h5>
            {length === 0 && <span className='text-muted'>Only available after linking more than one bank account</span>}
        </div>
    )
}

function AddSavingsPlanInputs({plaid_items, handleInput}: SavingsPlansInputProps): JSX.Element {
    const options = [
        { value: '', label: 'Every' },
        { value: 'daily', label: 'Day' },
        { value: 'weekly', label: 'Week' },
        { value: 'bi-weekly', label: 'Other Week' },
        { value: 'monthly', label: 'Month' },
        { value: 'quarterly', label: '3 Months' },
        { value: 'semi-annually', label: '6 Months' },
        { value: 'annually', label: 'Year' }
    ]

    const itemForm = useSelector((state: RootState) => state.addSavingsGoalForm)

    return plaid_items.length > 0 ? (
        <>
            <div className='col-sm-1'>
                <span>TRANSFER:</span>    
            </div>
            <div className='col-sm-3'>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                    </div>
                    <Form.Control
                        className='form-control'
                        name="savings_amount"
                        type="text"
                        onChange={(e) => handleInput(e)}
                        isInvalid={!!itemForm.savings_goal_input_errors.savings_amount}
                    />
                    <Form.Control.Feedback type="invalid">
                        {itemForm.savings_goal_input_errors.savings_amount}
                    </Form.Control.Feedback>
                </div>
            </div>
            <SavingsPlanAccountDropDown handleInput={handleInput} name={'fromAccount'} label='From' plaid_items={plaid_items} detail='From which account?'/>
            <SavingsPlanAccountDropDown handleInput={handleInput} name={'toAccount'} label='To' plaid_items={plaid_items} detail='To which account?'/>
            <Form.Group className='col-sm-2'>
                <Form.Control as='select' isInvalid={!!itemForm.savings_goal_input_errors.cadence} name="cadence" onChange={(e) => handleInput(e)}>
                    { options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                </Form.Control>
                <span className='text-muted'>How often?</span>
                <Form.Control.Feedback type="invalid">
                    {itemForm.savings_goal_input_errors.cadence}
                </Form.Control.Feedback>
            </Form.Group>
        </>
    ) : <div></div>
}

function AddSavingsGoalForm(): JSX.Element {
    const [isSaving, setIsSaving] = useState(false)
    const items = useSelector((state: RootState) => state.user.savings_items)
    const itemForm = useSelector((state: RootState) => state.addSavingsGoalForm)
    const plaid_items = useSelector((state: RootState) => state.user.plaid_items)

    const dispatch = useDispatch()

    /**COPIED LOGIN PAGE Helper function for getErrors */
    const empty = (input: string): boolean => !input || input === ''; 

    /**COPIED LOGIN PAGE Validate inputs and return a list of new errors since last form submit */
    const getSavingsGoalErrors = (): SavingsGoalInputErrors => {
        let errors: SavingsGoalInputErrors = {};
        if (empty(itemForm.savings_goal_inputs.name)) {
            errors.name = 'Please enter a name';
        }
    
        if (empty(itemForm.savings_goal_inputs.description)) {
            errors.description = 'Please enter a description';
        }

        if (empty(itemForm.savings_goal_inputs.amount)) {
            errors.amount = 'Please enter an amount';
        }

        if (empty(itemForm.savings_goal_inputs.link)) {
            errors.link = 'Please enter a link';
        }

        if (plaid_items.length > 0 &&  empty(itemForm.savings_goal_inputs.link)) {
            errors.fromAccount = empty(itemForm.savings_goal_inputs.fromAccount) ? 'Please enter a link' : '';
            errors.toAccount = empty(itemForm.savings_goal_inputs.toAccount) ? 
                'Please enter an account to save to' : '';
            errors.savings_amount = empty(itemForm.savings_goal_inputs.savings_amount) ? 'Please enter an amount to save' : '';
            errors.cadence = empty(itemForm.savings_goal_inputs.cadence) ? 'Please enter a savings rate' : '';
        }
    
        return errors;
    }

    const getUpdateObj = () => {
        return {
            name: itemForm.savings_goal_inputs.name,
            decription: itemForm.savings_goal_inputs.description,
            amount: Number.parseFloat(itemForm.savings_goal_inputs.amount),
            url: itemForm.savings_goal_inputs.link,
            saving_plan: {
                fromAccount: itemForm.savings_goal_inputs.fromAccount,
                toAccount: itemForm.savings_goal_inputs.toAccount,
                amount: Number.parseFloat(itemForm.savings_goal_inputs.savings_amount),
                cadence: itemForm.savings_goal_inputs.cadence
            }
        }
    }

    const handleInput = (e: any) => {
        console.log({
            ...itemForm.savings_goal_inputs,
            [e.target.name]: e.target.value
        })
        dispatch(addSavingsGoalFormActions.updateSavingsGoalInputs({
            ...itemForm.savings_goal_inputs,
            [e.target.name]: e.target.value,
        }))
    
        //check for previous error, reset error for new input
        if (!!itemForm.savings_goal_input_errors[e.target.name]) {
            dispatch(addSavingsGoalFormActions.updateSavingsGoalInputErrors({
                ...itemForm.savings_goal_input_errors,
                [e.target.name]: '',
            }))
        }
    }

    /** On from submit: 1. validate, 2. showspinner, 3. login/signup 4. @TODO: navigate to homepage  */
    const handleFormSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const newErrors: SavingsGoalInputErrors = getSavingsGoalErrors();

        if (Object.keys(newErrors).length > 0) {
            dispatch(addSavingsGoalFormActions.updateSavingsGoalInputErrors(newErrors));
            return;
        }

        dispatch(updateUserItems(getUpdateObj()))
    }


    return (
        <div className="row mb-5">
            <div className="col-sm-10 offset-sm-1 border mb-5">
                <div className='row mt-5 text-center'>
                    <h3>Add A Saving's Goal</h3>
                </div>
                <Form className='row g-3 mt-3'>
                    <FormInput label='Add A Name' name='name' type='text' handleInput={handleInput}/>
                    <FormInput label='Add A Description' name='description' type='text' handleInput={handleInput}/>
                    <FormInput label='Add A Link' name='link' type='text' handleInput={handleInput}/>
                    <FormInput label='Add A Goal Amount' name='amount' type='text' handleInput={handleInput}/>
                    <AutomaticTransfersSectionTitle length={plaid_items.length}/>
                    <AddSavingsPlanInputs plaid_items={plaid_items} handleInput={handleInput} />
                    <FormButton handleFormSubmit={handleFormSubmit} isSaving={isSaving} itemForm={itemForm} items={items}/>
                    {'' !== itemForm.add_error && <FormError error={itemForm.add_error}/>}
                </Form>
            </div>
        </div>
    )
}

export default AddSavingsGoalForm;
