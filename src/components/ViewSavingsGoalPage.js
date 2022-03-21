import '../App.css'
import { ProgressBar } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { locateAccounts, findSavingsItemByName } from '../utils/bank_accounts'
import { useParams, useNavigate } from 'react-router-dom'

function ViewSavingsGoalPage() {
    let { item_name } = useParams();
    const user = useSelector(state => state.user)
    const item = findSavingsItemByName(item_name, user.savings_items)
    const plaid_items = useSelector(state => state.user.plaid_items)

    const navigate = useNavigate()
    const progress = Math.round(10 / item.amount * 100);
    const progressInstance = <ProgressBar now={progress} label={`${progress}%`} />
    let [toAccount, fromAccount] = plaid_items ? locateAccounts(plaid_items, item) : [{}, {}]

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-sm-6 offset-sm-3 d-flex justify-content-between'>
                    <h3>{item.item_preview.title}</h3>
                    <h3>${item.amount}</h3>
                </div>
            </div>
            {
                item.item_preview && (
                    <div className='row my-3 item-url-row'>
                        <div className='col-sm-6 offset-sm-3'>
                            <div className='border d-flex justify-content-between ' onClick={() => console.log('view image')}>
                                <div className='d-flex align-items-center thumbnail-image-block'>
                                    <img alt='Item' className='img-fluid' src={item.item_preview.img ?? item.item_preview.favicon}/>
                                </div>
                                <div className='align-items-between d-flex flex-column px-2 pt-1 thumbnail-link-block'>
                                    <b><a href={item.url}>Visit Website</a></b>
                                    <p>{item.item_preview.description}...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* <div className='row'>c
                <div className='col-sm-6 offset-sm-3'>
                    <p><b>Description:</b> {item.description}</p>
                </div>
            </div> */}
            <div className='row mt-5'>
                <div className='col-sm-6 offset-sm-3 text-center'>
                    {progressInstance}
                </div>
            </div>
            <div className='row mt-5'>
                <div className='col-sm-6 offset-sm-3'>
                    <div className="input-group">
                        <p className="form-control-no-border">
                            <b>Saving Plan</b> -
                            Transfer ${item.saving_plan.amount} from the <b>{fromAccount.name}</b> to the <b>{toAccount.name}</b> -
                            &nbsp;{item.saving_plan.cadence}
                        </p>
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
            <div className='row mt-5'>
                <div className='col-sm-6 offset-sm-3 text-center'>
                    <button className="btn btn-primary" onClick={() => navigate('/goals')}>Back</button>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
        </div>
    );
}

export default ViewSavingsGoalPage;