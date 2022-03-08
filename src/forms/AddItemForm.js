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
    let [itemUrl, setItemUrl] = useState('')

    let [showToAccounts, setShowToAccounts] = useState(false)
    let [showFromAccounts, setShowFromAccounts] = useState(false)
    let [showSavingPeriods, setShowSavingPeriods] = useState(false)
    let [itemFromAccountLabel, setitemFromAccountLabel] = useState('Select An Account To Save From')
    let [itemToAccountLabel, setitemToAccountLabel] = useState('Select An Account To Save To')
    let [savingPeriodLabel, setSavingPeriodLabel] = useState('How Often Do you Save?')

    const itemForm = useSelector(state => state.itemForm)
    const plaid_items = useSelector(state => state.auth.user.plaid_items)

    const dispatch = useDispatch()

    const toggleDropDown = async (setStateCallback, currentState, dropdownsToHide) => {
        setStateCallback(!currentState)
        dropdownsToHide.forEach(dropdownCallback => {
            dropdownCallback(false)
        });
    }

    const savingPeriodHandler = async (event, cadence, label) => {
        event.preventDefault() 
        setItemSaveCadence(cadence)
        toggleDropDown(setShowSavingPeriods, showSavingPeriods, [setShowFromAccounts, setShowToAccounts])
        setSavingPeriodLabel(label)
    }

    return <div className="row">
                <div className="col-sm-6 offset-sm-3 border">
                    <div className='row mt-5'>
                            <div className='col-sm-3 offset-sm-3'>
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
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">$</span>
                                </div>
                                <input
                                    value = {itemAmount}
                                    onChange = {e => setItemAmount(e.target.value)}
                                    type="text" 
                                    className="form-control" 
                                    placeholder="How Much Is It?"
                                    required
                                />        
                            </div>
                        </div>
                        <div className='col-sm-6 offset-sm-3'>
                            <div className="dropdown">
                                <button onClick={() => toggleDropDown(setShowFromAccounts, showFromAccounts, [setShowSavingPeriods, setShowToAccounts])} 
                                    className="btn btn-secondary dropdown-toggle w-100" 
                                    type="button" 
                                    id="dropdownMenuButton" 
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    {itemFromAccountLabel}
                                </button>
                                <div className={showFromAccounts ? 'dropdown-menu-displayed w-100' : 'dropdown-menu w-100'}
                                    aria-labelledby="dropdownMenuButton">
                                    {
                                        plaid_items.map(plaidItem => {
                                            return plaidItem.accounts.map(account => {
                                                return (
                                                    <a className="dropdown-item" href="./" onClick={async e => {
                                                        e.preventDefault()
                                                        setitemFromAccountLabel(account.name)
                                                        setitemFromAccount(account.account_id)
                                                        toggleDropDown(setShowFromAccounts, showFromAccounts, [setShowSavingPeriods, setShowToAccounts])
                                                    }}>
                                                        {account.name}
                                                    </a>
                                                )
                                            })
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-6 offset-sm-3'>
                            <div className="dropdown">
                                <button onClick={() => toggleDropDown(setShowToAccounts, showToAccounts, [setShowFromAccounts, setShowSavingPeriods])} 
                                    className="btn btn-secondary dropdown-toggle w-100" 
                                    type="button" 
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    {itemToAccountLabel}
                                </button>
                                <div className={showToAccounts ? 'dropdown-menu-displayed w-100' : 'dropdown-menu w-100'}
                                    aria-labelledby="dropdownMenuButton">
                                    {
                                        plaid_items.map(plaidItem => {
                                            return plaidItem.accounts.map(account => {
                                                return (
                                                    <a className="dropdown-item" href="./" onClick={async e => {
                                                        e.preventDefault()
                                                        setitemToAccountLabel(account.name)
                                                        setitemToAccount(account.account_id)
                                                        toggleDropDown(setShowToAccounts, showToAccounts, [setShowFromAccounts, setShowSavingPeriods])
                                                    }}>
                                                        {account.name}
                                                    </a>
                                                )
                                            })
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-6 offset-sm-3'>
                            <div className="dropdown">
                                <button onClick={() => toggleDropDown(setShowSavingPeriods, showSavingPeriods, [setShowFromAccounts, setShowToAccounts])} 
                                    className="btn btn-secondary dropdown-toggle w-100" 
                                    type="button" 
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    {savingPeriodLabel}
                                </button>
                                <div className={showSavingPeriods ? 'dropdown-menu-displayed w-100' : 'dropdown-menu w-100'}
                                    aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="./" onClick={e => savingPeriodHandler(e, 'daily', 'Daily')}>Daily</a>
                                    <a className="dropdown-item" href="./" onClick={e => savingPeriodHandler(e, 'weekly', 'Wekly')}>Weekly</a>
                                    <a className="dropdown-item" href="./" onClick={e => savingPeriodHandler(e, 'bi-weekly', 'Bi-Weekly')}>Bi-Weekly</a>
                                    <a className="dropdown-item" href="./" onClick={e => savingPeriodHandler(e, 'monthly', 'Monthly')}>Monthly</a>
                                    <a className="dropdown-item" href="./" onClick={e => savingPeriodHandler(e, 'quarterly', 'Quarterly')}>Quarterly</a>
                                    <a className="dropdown-item" href="./" onClick={e => savingPeriodHandler(e, 'semi-annually', 'Semi-Annually')}>Semi-Annually</a>
                                    <a className="dropdown-item" href="./" onClick={e => savingPeriodHandler(e, 'annually', 'Annually')}>Annually</a>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-6 offset-sm-3 text-center'>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">$</span>
                                </div>
                                <input
                                    value = {itemSaveAmount}
                                    onChange = {e => setItemSaveAmount(e.target.value)}
                                    type="text" 
                                    className="form-control" 
                                    placeholder="How Much Money Do You Save?"
                                    required
                                />             
                            </div>
                        </div>
                        <div className='col-sm-6 offset-sm-3 text-center'>
                            <div className="input-group flex-nowrap">
                                <input
                                    value = {itemUrl}
                                    onChange = {e => setItemUrl(e.target.value)}
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Add a link to the website for the item"
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
                                        url: itemUrl,
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