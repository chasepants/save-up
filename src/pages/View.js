import '../App.css'
import { ProgressBar } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import pageActions from '../redux/actions/pageActions'
import pageNumbers from '../utils/navigation'
import { locateAccounts } from '../utils/bank_accounts'

function View() {
    const page = useSelector(state => state.page )
    const plaid_items = useSelector(state => state.auth.user.plaid_items)

    const dispatch = useDispatch()
    const amount_saved = page.item.saved ?? 0
    const progress = Math.round(amount_saved / page.item.amount * 100);
    const progressInstance = <ProgressBar now={progress} label={`${progress}%`} />;
    console.log('refresh')
    let [toAccount, fromAccount] = plaid_items ? locateAccounts(plaid_items, page) : [{}, {}]
    console.log(toAccount)

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-sm-6 offset-sm-3 d-flex justify-content-between'>
                    <h3>{page.item.item_preview.title}</h3>
                    <h3>${page.item.amount}</h3>
                </div>
            </div>
            {
                page.item.item_preview && (
                    <div className='row my-3 item-url-row'>
                        <div className='col-sm-6 offset-sm-3'>
                            <div className='border d-flex justify-content-between ' onClick={() => console.log('view image')}>
                                <div className='d-flex align-items-center thumbnail-image-block'>
                                    <img alt='Item' className='img-fluid' src={page.item.item_preview.img ?? page.item.item_preview.favicon}/>
                                </div>
                                <div className='align-items-between d-flex flex-column px-2 pt-1 thumbnail-link-block'>
                                    <b><a href={page.item.url}>Visit Website</a></b>
                                    <p>{page.item.item_preview.description}...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* <div className='row'>c
                <div className='col-sm-6 offset-sm-3'>
                    <p><b>Description:</b> {page.item.description}</p>
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
                            Transfer ${page.item.saving_plan.amount} from the <b>{fromAccount.name}</b> to the <b>{toAccount.name}</b> -
                            &nbsp;{page.item.saving_plan.cadence}
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
                    <button className="btn btn-primary" onClick={() => dispatch(pageActions.updatePage({}, pageNumbers.SAVINGS_GOALS_PAGE))}>Back</button>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
        </div>
    );
}

export default View;