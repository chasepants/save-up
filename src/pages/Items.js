import '../App.css'
import { useSelector, useDispatch } from 'react-redux'
import { removeUserItem } from '../redux/thunks/user'
import AddItemForm from '../forms/AddItemForm'
import pageActions from '../redux/actions/pageActions'
import itemFormActions from '../redux/actions/itemFormActions'

function Items() {    
    const itemForm = useSelector(state => state.itemForm)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-sm-6 offset-sm-3'>
                    <h3>Items</h3>
                </div>
            </div>
            {user.items.map(item => {
                if (item) {
                    return (
                        <div key={item.name} className='row'>
                            <div className='col-sm-6 offset-sm-3'>
                                <div className="input-group">
                                    <p className="form-control">{item.name}</p>
                                    <div className="input-group-append">
                                        <button onClick={() => { 
                                            dispatch(pageActions.updatePage(item, 1))
                                        }} className="btn-sharp btn-outline-primary" type="button">view</button>
                                        <button onClick={() => dispatch(removeUserItem(item))} className="btn-sharp btn-outline-danger" type="button">delete</button>
                                        <button className="btn-sharp btn-outline-warning" type="button">share</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                return ''
            })}
            {
                !itemForm.show_form && (
                    <div className='row'>
                        <div className='col-sm-6 offset-sm-3 text-center'>
                            <button onClick={() => dispatch(itemFormActions.showItemForm())} className="btn-sharp btn-success">Add</button>
                        </div>
                    </div>
                )
            }
            {
                '' === itemForm.remove_error && (
                    <div className='row'>
                        <div className='col-sm-6 offset-sm-3'>
                            <p>{itemForm.remove_error}</p>
                        </div>
                    </div>
                )
            }
            {
                itemForm.show_form && 
                <AddItemForm/>
            }
        </div>
    );
}

export default Items;
