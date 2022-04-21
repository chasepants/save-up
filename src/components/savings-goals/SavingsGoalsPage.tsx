import '../../App.css'
import { useSelector, useDispatch } from 'react-redux'
import { removeUserItem } from '../../redux/thunks/user'
import AddSavingsGoalForm from './AddSavingsGoalForm'
import { Navigate, useNavigate } from 'react-router-dom'
import { RootState } from '../../redux/reducers'
import { SavingsItem } from '../../library/types'
import { SavingsGoalAddButtonProps, SavingsGoalErrorProps, SavingsItemProps } from './types'
import { showForm } from '../../redux/reducers/savingsGoalForm'

function SavingsGoalRow(props: SavingsItemProps) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div key={props.item.name} className='row'>
            <div className='col-sm-6 offset-sm-3'>
                <div className="input-group">
                    <p className="form-control">{props.item.name}</p>
                    <div className="input-group-append">
                        <button onClick={() => navigate(`/goal/${props.item.name}`)} className="btn-sharp btn-outline-primary">view</button>
                        <button onClick={() => dispatch(removeUserItem(props.item))} className="btn-sharp btn-outline-danger">delete</button>
                        <button className="btn-sharp btn-outline-warning" type="button">share</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SavingsGoalAddButton(props: SavingsGoalAddButtonProps): JSX.Element {
    const dispatch = useDispatch()
    const toggleForm = () => dispatch(showForm())

    return (!props.itemForm.show_form && props.user.savings_items.length !== 0) ? (
        <div className='row'>
            <div className='col-sm-6 offset-sm-3 text-center'>
                <button onClick={toggleForm} className="btn-sharp btn-success">
                    Add
                </button>
            </div>
        </div>
    ) : <div></div>
}

function SavingsGoalError(props: SavingsGoalErrorProps): JSX.Element {
    return ('' === props.itemForm.remove_error) ? (
        <div className='row'>
            <div className='col-sm-6 offset-sm-3'>
                <p>{props.itemForm.remove_error}</p>
            </div>
        </div>
    ) : <div></div>
}

function SavingsGoalsPage(): JSX.Element {    
    const itemForm = useSelector((state: RootState) => state.savingsGoalForm)
    const user = useSelector((state: RootState) => state.user)

    return user ? (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-sm-10 offset-sm-1 text-center'>
                    {user.savings_items && user.savings_items.length > 0 && <h3>Savings Goals</h3>}
                </div>
            </div>
            {user.savings_items.map((item: SavingsItem) => item ? <SavingsGoalRow key={item.name} item={item} /> : '')}
            <SavingsGoalAddButton user={user} itemForm={itemForm}/>
            <SavingsGoalError itemForm={itemForm}/>
            {(itemForm.show_form || user.savings_items.length === 0) && <AddSavingsGoalForm/>}
        </div>
    ): <Navigate to='/login' />;
}

export default SavingsGoalsPage;
