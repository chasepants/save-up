import '../App.css'
import gibson from './assets/gibson.png'
import { ProgressBar } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import pageActions from '../redux/actions/pageActions'

function View() {
    const page = useSelector(state => state.page )
    const dispatch = useDispatch()
    
    const now = Math.round(page.item.saved / page.item.amount * 100);
    const progressInstance = <ProgressBar now={now} label={`${now}%`} />;

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-sm-6 offset-sm-3 d-flex justify-content-between'>
                    <h3>{page.item.name} ${page.item.amount}</h3>
                    <button onClick={() => 
                        dispatch(pageActions.updatePage({}, 0))} className="btn btn-primary">Back</button>
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-6 offset-sm-3'>
                    <img alt='Item' className='img-fluid' src={gibson}/>
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-6 offset-sm-3'>
                    <p><b>Description:</b> {page.item.description}</p>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-sm-6 offset-sm-3 text-center'>
                    {progressInstance}
                    <p><b>watch your savings grow</b></p>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-sm-6 offset-sm-3'>
                    <div className="input-group">
                        <p className="form-control-no-border">
                            <b>Savings Plan:</b> {page.item.saving_plan.amount} from "{page.item.saving_plan.bank}", {page.item.saving_plan.cadence} times a month
                        </p>
                        <div className="input-group-append">
                            <button className="btn-sharp btn-outline-warning" type="button">EDIT</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-sm-6 offset-sm-3 text-center'>
                    <h3>Hype Board!!</h3>
                    
                    <div className='p-5 border border-dark'>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <b>Friend:</b>
                            </div>
                            <p className="form-control-no-border">Dude nice can't wait to jam!</p>
                            
                        </div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <b>Friend:</b>
                            </div>
                            <p className="form-control-no-border">Dude nice can't wait to jam!</p>
                            
                        </div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <b>Friend:</b>
                            </div>
                            <p className="form-control-no-border">Dude nice can't wait to jam!</p>
                            
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
        </div>
    );
}

export default View;