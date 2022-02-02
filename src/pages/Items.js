import '../App.css'
import {useEffect, useState} from 'react'
import { updateUserItems } from '../api/auth'

function Items({user, viewPage}) {
    let [showItemEditor, setShowItemEditor] = useState(false)
    let [items, setItems] = useState([...user.items])
    let [addItemError, setAddItemError] = useState('')
    let [removeItemError, setRemoveItemError] = useState('')
    let [itemName, setItemName] = useState('')
    let [itemDescription, setItemDescription] = useState('')
    let [itemAmount, setItemAmount] = useState('')
    let [itemAmountSaved, setItemAmountSaved] = useState('')
    let [itemAccount, setItemAccount] = useState('')
    let [itemSaveCadence, setItemSaveCadence] = useState('')
    let [itemSaveAmount, setItemSaveAmount] = useState('')

    const validateItem = item => {
        if (
            item.name === ""  ||
            item.amount === 0 ||
            item.saving_plan === {}
        ) {
            console.log('looks not good')
            return false
        }
        
        if (
            item.saving_plan.bank === "" ||
            item.saving_plan.amount === 0 ||
            item.saving_plan.cadence === 0
        
        ) {
            console.log('looks not good')
            return false
        }
        
        console.log('looks good')
        
        return true
    }

    const removeItem = async (delete_item) => {
        let index;
        let updated_items = items.map((item, i) => {
            if (item !== delete_item)
                return item 
            index = i
        })

        updated_items.splice(index, 1);

        let response = await updateUserItems(user.username, user.password, updated_items)
        console.log(response)

        if (false === response) {
            setRemoveItemError('Your item could not be deleted. Please try again.')
        } else {
            console.log('your item has been deleted!')
            setItems(updated_items)
        }
    }

    const addItem = async () => {
        let item = {
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

        console.log(item)
        if (!validateItem(item)) {
            setAddItemError('Your item could not be saved. Please try again.')
        }
        
        let response = await updateUserItems(user.username, user.password, [...user.items, item])
        console.log(response)

        if (false === response) {
            setAddItemError('Your item could not be saved. Please try again.')
        } else {
            console.log('your item has been added!')
            setItems([
                ...items,
                item
            ])
            setShowItemEditor(false)
            setAddItemError('')
        }
    }

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-sm-6 offset-sm-3'>
                    <h3>WHY YOU SLAVE...</h3>
                </div>
            </div>
            {items.map(item => {
                if (item) {
                    return (
                        <div className='row'>
                            <div className='col-sm-6 offset-sm-3'>
                                <div className="input-group">
                                    <p className="form-control">{item.name}</p>
                                    <div className="input-group-append">
                                        <button onClick={() => viewPage({number: 1, item: item})} className="btn-sharp btn-outline-primary" type="button">view</button>
                                        <button onClick={() => removeItem(item)} className="btn-sharp btn-outline-danger" type="button">delete</button>
                                        <button className="btn-sharp btn-outline-warning" type="button">share</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            })}
            {
                '' === removeItemError && (
                    <div className='row'>
                        <div className='col-sm-6 offset-sm-3'>
                            <p>{removeItemError}</p>
                        </div>
                    </div>
                )
            }
            {
                showItemEditor && (
                    <>
                        <div className='row mt-5'>
                            <div className='col-sm-6 offset-sm-3'>
                                <p>Add A New Item</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6 offset-sm-3 text-center'>
                                <ul class="list-group">
                                    <li class="list-group-item">
                                        <div class="input-group flex-nowrap">
                                            <input 
                                                value={itemName}
                                                onChange={e => setItemName(e.target.value)}
                                                type="text"
                                                class="form-control" 
                                                placeholder="Item Name"
                                            />
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="input-group flex-nowrap">
                                            <input
                                                value = {itemDescription}
                                                onChange = {e => setItemDescription(e.target.value)}
                                                type="text" 
                                                class="form-control" 
                                                placeholder="Item Description"
                                            />
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="input-group flex-nowrap">
                                            <input
                                                value = {itemAmount}
                                                onChange = {e => setItemAmount(e.target.value)}
                                                type="text" 
                                                class="form-control" 
                                                placeholder="Amount"
                                            />
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="input-group flex-nowrap">
                                            <input
                                                value = {itemAmountSaved}
                                                onChange = {e => setItemAmountSaved(e.target.value)}
                                                type="text" 
                                                class="form-control" 
                                                placeholder="Amount Already Saved"
                                            />
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="input-group flex-nowrap">
                                            <input
                                                value = {itemAccount}
                                                onChange = {e => setItemAccount(e.target.value)}
                                                type="text" 
                                                class="form-control" 
                                                placeholder="Account To Save From"
                                            />
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="input-group flex-nowrap">
                                            <input
                                                value = {itemSaveCadence}
                                                onChange = {e => setItemSaveCadence(e.target.value)}
                                                type="text" 
                                                class="form-control" 
                                                placeholder="How Many Weeks Per Month Do You Save"
                                            />
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="input-group flex-nowrap">
                                            <input
                                                value = {itemSaveAmount}
                                                onChange = {e => setItemSaveAmount(e.target.value)}
                                                type="text" 
                                                class="form-control" 
                                                placeholder="How Much Do You Save"
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {
                            '' === addItemError && (
                                <div className='row mt-2'>
                                    <div className='col-sm-6 offset-sm-3'>
                                        <p className='invalid-feedback'>{addItemError}</p>
                                    </div>
                                </div>
                            )
                        }
                    </>
                )
            }
            <div className='row mt-3'>
                <div className='col-sm-6 offset-sm-3 text-center'>
                    
                    {(() =>{
                        return showItemEditor ? (
                            <>
                                <div className="input-group d-flex justify-content-evenly">
                                    <button onClick={() => addItem()} className="btn-sharp btn-success">Save</button>
                                    <button onClick={() => setShowItemEditor(false)} className="btn-sharp btn-warning">Close</button>
                                </div>
                            </>
                        ) : <button onClick={() => setShowItemEditor(true)} className="btn-sharp btn-success">Add</button>
                    })()}
                    
                </div>
            </div>
        </div>
    );
}

export default Items;