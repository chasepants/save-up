import '../App.css'
import {useState} from 'react'

function Items({viewPage}) {
    let [items, setItems] = useState(['Gibson SG', 'Polaris 4x4', 'Mac Book Pro'])
    let [add_item_name, setAddItemName] = useState('')

    const removeItem = (delete_item) => {
        let updated_items = items.map(item=>{
            return item !== delete_item ? item : null; 
        })
        console.log(updated_items)

        setItems(updated_items)
    }

    const addItem = () => {
        setItems([
            ...items,
            add_item_name
        ])
        setAddItemName('')
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
                                    <p className="form-control">{item}</p>
                                    <div className="input-group-append">
                                        <button onClick={()=>viewPage({number: 1, item: item})} className="btn-sharp btn-outline-primary" type="button">view</button>
                                        <button onClick={() => removeItem(item)} className="btn-sharp btn-outline-danger" type="button">delete</button>
                                        <button className="btn-sharp btn-outline-warning" type="button">share</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            })}
            <div className='row'>
            <div className='col-sm-6 offset-sm-3'>
                <div className="input-group">
                    <input value={add_item_name} onChange={e => setAddItemName(e.target.value)} type="text" class="form-control" placeholder="item name" aria-label="item name" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                    <button onClick={() => addItem()} className="btn-sharp btn-success">New +</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Items;