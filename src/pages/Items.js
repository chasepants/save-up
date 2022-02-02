import '../App.css'
import { useState } from 'react'
import { updateUserItems } from '../api/auth'
import AddItemForm from '../forms/AddItemForm'

function Items({user, viewPage}) {
    let [showItemEditor, setShowItemEditor] = useState(false)
    let [items, setItems] = useState([...user.items])
    let [removeItemError, setRemoveItemError] = useState('')

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

    const addItem = async item => {    
        let response = await updateUserItems(user.username, user.password, [...user.items, item])
        console.log(response)

        if (false === response) {
            return false
        } else {
            console.log('your item has been added!')
            setItems([
                ...items,
                item
            ])
            setShowItemEditor(false)
            return true
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
                !showItemEditor && (
                    <div className='row'>
                        <div className='col-sm-6 offset-sm-3 text-center'>
                            <button onClick={() => setShowItemEditor(true)} className="btn-sharp btn-success">Add</button>
                        </div>
                    </div>
                )
            }
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
                showItemEditor && <AddItemForm addItem={addItem} setShowItemEditor={setShowItemEditor}/>
            }
        </div>
    );
}

export default Items;
