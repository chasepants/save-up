import { updateUserItems } from '../redux/thunks/user'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import itemFormActions from '../redux/actions/itemFormActions'

function AddItemForm() {
    let [itemName, setItemName] = useState('')
    let [itemDescription, setItemDescription] = useState('')
    let [itemAmount, setItemAmount] = useState('')
    let [itemFromAccount, setitemFromAccount] = useState('')
    let [itemToAccount, setitemToAccount] = useState('')
    let [itemSaveCadence, setItemSaveCadence] = useState('')
    let [itemSaveAmount, setItemSaveAmount] = useState('')

    const itemForm = useSelector(state => state.itemForm)
    const plaid_items = useSelector(state => state.auth.user.plaid_items)

    const dispatch = useDispatch()

    return <div className="row">
                <div className="col-sm-6 offset-sm-3 border">
                    <div className='row mt-5'>
                            <div className='col-sm-3 offset-sm-3'>
                                <p>Add A New Item</p>
                            </div>
                    </div>
                    <form className='row g-3 text-center'>
                        <div className='col-sm-6 offset-sm-3 text-center'>
                            <div className="input-group flex-nowrap">
                                <input 
                                    value={itemName}
                                    onChange={e => setItemName(e.target.value)}
                                    type="text"
                                    className="form-control" 
                                    placeholder="Item Name"
                                    required
                                />
                            </div>
                        </div>
                        <div className='col-sm-6 offset-sm-3 text-center'>
                            <div className="input-group flex-nowrap">
                                <input
                                    value = {itemDescription}
                                    onChange = {e => setItemDescription(e.target.value)}
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Item Description"
                                    required
                                />
                            </div>
                        </div>
                        <div className='col-sm-6 offset-sm-3 text-center'>        
                            <div className="input-group flex-nowrap">
                                <input
                                    value = {itemAmount}
                                    onChange = {e => setItemAmount(e.target.value)}
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Amount"
                                    required
                                />
                            </div>
                        </div>
                        <div className='col-sm-6 offset-sm-3 text-center'>
                            <div className="input-group flex-nowrap">
                                <select required defaultValue="placeholder" onChange={e => setitemFromAccount(e.target.value)}>
                                    <option value="placeholder" disabled>Account To Save From</option>
                                    {
                                        plaid_items.map(plaidItem => {
                                            return plaidItem.accounts.map(account => {
                                                return <option key={account.account_id} value={account.account_id}>{account.name}</option>
                                            })
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='col-sm-6 offset-sm-3 text-center'>
                            <div className="input-group flex-nowrap">
                                <select required defaultValue="placeholder" onChange={e => setitemToAccount(e.target.value)}>
                                    <option value="placeholder" disabled>Account To Save To</option>
                                    {
                                        plaid_items.map(plaidItem => {
                                            return plaidItem.accounts.map(account => {
                                                return <option key={account.account_id} value={account.account_id}>{account.name}</option>
                                            })
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='col-sm-6 offset-sm-3 text-center'>
                            <div className="input-group flex-nowrap">
                                <select required defaultValue='placeholder' onChange = {e => setItemSaveCadence(e.target.value)}>
                                    <option value='placeholder' disabled>How Often Do You Save?</option>
                                    <option key='daily' value='daily'>Daily</option>
                                    <option key='weekly' value='weekly'>Weekly</option>
                                    <option key='bi-weekly' value='bi-weekly'>Bi-Weekly</option>
                                    <option key='monthly' value='monthly'>Monthly</option>
                                    <option key='quarterly' value='quarterly'>Quarterly</option>
                                    <option key='semi-annually' value='semi-annually'>Semi-Annually</option>
                                    <option key='annually' value='annually'>Annually</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-sm-6 offset-sm-3 text-center'>
                            <div className="input-group flex-nowrap">
                                <input
                                    value = {itemSaveAmount}
                                    onChange = {e => setItemSaveAmount(e.target.value)}
                                    type="text" 
                                    className="form-control" 
                                    placeholder="How Much Do You Save"
                                    required
                                />
                            </div>
                        </div>
                        <div className='col-sm-6 offset-sm-3 text-center'>
                            <div className="input-group d-flex justify-content-evenly">
                                <button onClick={e => {
                                    e.preventDefault()
                                    dispatch(updateUserItems({
                                        name: itemName,
                                        decription: itemDescription,
                                        amount: Number.parseFloat(itemAmount),
                                        saving_plan: {
                                            fromAccount: itemFromAccount,
                                            toAccount: itemToAccount,
                                            amount: Number.parseFloat(itemSaveAmount),
                                            cadence: itemSaveCadence
                                        }
                                    }))
                                    //@TODO: Can this be moved to a function?? Seems crowded here.
                                    setItemSaveAmount('')
                                    setItemSaveCadence('')
                                    setitemFromAccount('')
                                    setitemToAccount('')
                                    setItemAmount('')
                                    setItemDescription('')
                                    setItemName('')
                                }} className="btn-sharp btn-success">Save</button>

                                <button onClick={() => dispatch(itemFormActions.hideItemForm())} className="btn-sharp btn-warning">Close</button>
                            </div>
                        </div>
                        {
                            '' !== itemForm.add_error && (
                                <div className='col-sm-6 offset-sm-3 text-center'>
                                    <p>{itemForm.add_error}</p>
                                </div>
                            )
                        }
                    </form>    
                </div>
            </div>
}

export default AddItemForm;