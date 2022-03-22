import '../App.css'
import { useSelector, useDispatch } from 'react-redux'
import { removeUserItem } from '../redux/thunks/user'
import addSavingsGoalFormActions from '../redux/actions/addSavingsGoalFormActions'
import AddSavingsGoalForm from './AddSavingsGoalForm'
import { useNavigate } from 'react-router-dom'

function SavingsGoalRow({item, removeUserItem}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div key={item.name} className='row'>
            <div className='col-sm-6 offset-sm-3'>
                <div className="input-group">
                    <p className="form-control">{item.name}</p>
                    <div className="input-group-append">
                        <button onClick={() => navigate(`/goal/${item.name}`)} className="btn-sharp btn-outline-primary">view</button>
                        <button onClick={() => dispatch(removeUserItem(item))} className="btn-sharp btn-outline-danger">delete</button>
                        <button className="btn-sharp btn-outline-warning" type="button">share</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SavingsGoalAddButton({user, itemForm}) {
    const dispatch = useDispatch()
    const toggleForm = () => dispatch(addSavingsGoalFormActions.showAddSavingsGoalForm())

    return (
        (!itemForm.show_form && user.savings_items.length !== 0) && 
        <div className='row'>
            <div className='col-sm-6 offset-sm-3 text-center'>
                <button onClick={toggleForm} className="btn-sharp btn-success">
                    Add
                </button>
            </div>
        </div>
    )
}

function SavingsGoalError({itemForm}) {
    return (
        ('' === itemForm.remove_error) && <div className='row'>
            <div className='col-sm-6 offset-sm-3'>
                <p>{itemForm.remove_error}</p>
            </div>
        </div>
    )
}

function SavingsGoalsPage() {    
    const itemForm = useSelector(state => state.addSavingsGoalForm)
    const user = useSelector(state => state.user)

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-sm-10 offset-sm-1 text-center'>
                    {user.savings_items.length > 0 && <h3>Savings Goals</h3>}
                </div>
            </div>
            {user.savings_items.map(item => item ? <SavingsGoalRow item={item} removeUserItem={removeUserItem} /> : '')}
            <SavingsGoalAddButton user={user} itemForm={itemForm}/>
            <SavingsGoalError itemForm={itemForm}/>
            {(itemForm.show_form || user.savings_items.length === 0) && <AddSavingsGoalForm/>}
        </div>
    );
}

export default SavingsGoalsPage;
