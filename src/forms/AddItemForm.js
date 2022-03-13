import { updateUserItems } from '../redux/thunks/user'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import itemFormActions from '../redux/actions/itemFormActions'
import ClipLoader from 'react-spinners/ClipLoader'
import { Button, Form  } from 'react-bootstrap'

function AddItemForm() {
    const [inputs, setInputs] = useState({})
    const [errors, setErrors] = useState({})

    let [isSaving, setIsSaving] = useState(false)

    const itemForm = useSelector(state => state.itemForm)
    const plaid_items = useSelector(state => state.auth.user.plaid_items)

    const dispatch = useDispatch()

    const handleInput = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        })
    
        //check for previous error, reset error for new input
        if (!!errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: null,
            })
        }

        console.log(inputs)
    }

    const handleFormSubmit = async e => {
        e.preventDefault()
        setIsSaving(true) 

        const newErrors = getErrors()
    
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors)
          setIsSaving(false)
          return
        }
        
        dispatch(updateUserItems({
            name: inputs.goal,
            decription: inputs.description,
            amount: Number.parseFloat(inputs.amount),
            url: inputs.link,
            saving_plan: {
                fromAccount: inputs.transfer_from_id,
                toAccount: inputs.transfer_to_id,
                amount: Number.parseFloat(inputs.savings_amount),
                cadence: inputs.savings_rate
            }
        }))
    }

    const getErrors = () => {
        const {
            goal, 
            description,
            amount, 
            link,
            transfer_from_id,
            transfer_to_id, 
            savings_amount,
            savings_rate
        } = inputs

        const newErrors = {}
        
        if (!goal || goal === '') newErrors.goal = 'Enter goal'
        if (!description || description === '') newErrors.description = 'Enter description'
        if (!amount || amount === '') newErrors.amount = 'Please enter a goal amount'
        if (!link || link === '') newErrors.link = 'Please enter a link'
        if (!transfer_from_id || transfer_from_id === '') newErrors.transfer_from_id = 'Please enter a transfer from id'
        if (!transfer_to_id || transfer_to_id === '') newErrors.transfer_to_id = 'Please enter a transfer from id'
        if (!savings_amount || savings_amount === '') newErrors.savings_amount = 'Please enter a savings amount'
        if (!savings_rate || savings_rate === '') newErrors.savings_rate = 'Please enter a savings rate'
        
        return newErrors
    }

    return <div className="row">
                <div className="col-sm-6 offset-sm-3 border">
                    <div className='row mt-5'>
                        <h3>Add Saving's Goal</h3>
                    </div>
                    <Form className='row g-3 mt-3'>
                        <Form.Group className='col-sm-6 offset-sm-3 text-center'>
                            <Form.Label>Add A Goal Name</Form.Label>
                            <Form.Control
                                name="goal"
                                type="text"
                                onChange={(e) => handleInput(e)}
                                isInvalid={!!errors.goal}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.goal}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='col-sm-6 offset-sm-3 text-center'>
                            <Form.Label>Add Description</Form.Label>
                            <Form.Control
                                name="description"
                                type="text"
                                onChange={(e) => handleInput(e)}
                                isInvalid={!!errors.description}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.description}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='col-sm-6 offset-sm-3 text-center'>
                            <Form.Label>Add Goal Amount</Form.Label>
                            <Form.Control
                                name="amount"
                                type="text"
                                onChange={(e) => handleInput(e)}
                                isInvalid={!!errors.amount}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.amount}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='col-sm-6 offset-sm-3'>
                            <Form.Control onChange={(e) => handleInput(e)} as='select' name='transfer_from_id' isInvalid={!!errors.transfer_from_id}>
                                <option value=''>Transfer From</option>
                                {
                                    plaid_items.map(plaidItem => {
                                        return plaidItem.accounts.map(account => {
                                            return (
                                                <option key={account.account_id} value={account.account_id}>
                                                    {account.name}
                                                </option>
                                            ) 
                                        })
                                    })
                                }
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.transfer_from_id}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='col-sm-6 offset-sm-3'>
                            <Form.Control as='select' name="transfer_to_id" isInvalid={!!errors.transfer_to_id} onChange={(e) => handleInput(e)}>
                                <option value=''>Transfer To</option>
                                {
                                    plaid_items.map(plaidItem => {
                                        return plaidItem.accounts.map(account => {
                                            return (
                                                <option key={account.account_id} value={account.account_id}>
                                                    {account.name}
                                                </option>
                                            ) 
                                        })
                                    })
                                }
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.transfer_to_id}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='col-sm-6 offset-sm-3'>
                            <Form.Control as='select' isInvalid={!!errors.savings_rate} name="savings_rate" onChange={(e) => handleInput(e)}>
                                    <option value=''>Every</option>
                                    <option value='daily'>Day</option>
                                    <option value='weekly'>Week</option>
                                    <option value='bi-weekly'>Other Week</option>
                                    <option value='monthly'>Month</option>
                                    <option value='quarterly'>3 Months</option>
                                    <option value='semi-annually'>6 Months</option>
                                    <option value='annually'>Year</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.savings_rate}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='col-sm-6 offset-sm-3 text-center'>
                            <Form.Label>Add Savings Amount</Form.Label>
                            <Form.Control
                                name="savings_amount"
                                type="text"
                                onChange={(e) => handleInput(e)}
                                isInvalid={!!errors.savings_amount}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.savings_amount}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='col-sm-6 offset-sm-3 text-center'>
                            <Form.Label>Add A Link</Form.Label>
                            <Form.Control
                                name="link"
                                type="text"
                                onChange={(e) => handleInput(e)}
                                isInvalid={!!errors.link}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.link}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='col-sm-6 offset-sm-3 text-center mb-5'>
                            <div className="input-group d-flex justify-content-evenly">
                                <Button onClick={e => handleFormSubmit(e)} className="btn-sharp btn-success">
                                    { isSaving ? <ClipLoader color="#ffffff" loading={isSaving} size={20} /> : "Save" } 
                                </Button>

                                <Button onClick={() => dispatch(itemFormActions.hideItemForm())} className="btn-sharp btn-warning">Close</Button>
                            </div>
                        </Form.Group>
                        {
                            '' !== itemForm.add_error && (
                                <div className='col-sm-6 offset-sm-3 text-center'>
                                    <p>{itemForm.add_error}</p>
                                </div>
                            )
                        }
                    </Form>
                </div>
            </div>
}

export default AddItemForm;
