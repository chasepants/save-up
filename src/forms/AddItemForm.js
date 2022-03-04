import { updateUserItems } from '../redux/thunks/user'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import itemFormActions from '../redux/actions/itemFormActions'

function AddItemForm() {
    let [itemName, setItemName] = useState('')
    let [itemDescription, setItemDescription] = useState('')
    let [itemAmount, setItemAmount] = useState('')
    let [itemAmountSaved, setItemAmountSaved] = useState('')
    let [itemAccount, setItemAccount] = useState('')
    let [itemSaveCadence, setItemSaveCadence] = useState('')
    let [itemSaveAmount, setItemSaveAmount] = useState('')

    const itemForm = useSelector(state => state.itemForm)
    const dispatch = useDispatch()

    return <>
                <div className='row mt-5'>
                    <div className='col-sm-6 offset-sm-3'>
                        <p>Add A New Item</p>
                    </div>
                </div>
                <form className='row g-3'>
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
                            <input
                                value = {itemAmountSaved}
                                onChange = {e => setItemAmountSaved(e.target.value)}
                                type="text" 
                                className="form-control" 
                                placeholder="Amount Already Saved"
                                required
                            />
                        </div>
                    </div>
                    <div className='col-sm-6 offset-sm-3 text-center'>
                        <div className="input-group flex-nowrap">
                            <input
                                value = {itemAccount}
                                onChange = {e => setItemAccount(e.target.value)}
                                type="text" 
                                className="form-control" 
                                placeholder="Account To Save From"
                                required
                            />
                        </div>
                    </div>
                    <div className='col-sm-6 offset-sm-3 text-center'>
                        <div className="input-group flex-nowrap">
                            <input
                                value = {itemSaveCadence}
                                onChange = {e => setItemSaveCadence(e.target.value)}
                                type="text" 
                                className="form-control" 
                                placeholder="How Many Weeks Per Month Do You Save"
                                required
                            />
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
                                const item = {
                                    name: itemName,
                                    decription: itemDescription,
                                    amount: Number.parseFloat(itemAmount),
                                    saved: Number.parseFloat(itemAmountSaved),
                                    saving_plan: {
                                        bank: itemAccount,
                                        amount: Number.parseFloat(itemSaveAmount),
                                        cadence: Number.parseInt(itemSaveCadence)
                                    }
                                }
                                dispatch(updateUserItems(item))
                                setItemSaveAmount('')
                                setItemSaveCadence('')
                                setItemAccount('')
                                setItemAmountSaved('')
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
            </>
}

export default AddItemForm;