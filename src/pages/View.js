import '../App.css'
import { ProgressBar } from 'react-bootstrap'
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
                    <h3>{page.item.item_preview.title}</h3>
                    <h3>${page.item.amount}</h3>
                </div>
            </div>
            {
                page.item.item_preview && (
                    <div className='row my-3 item-url-row'>
                        <div className='col-sm-6 offset-sm-3'>
                            <div class='border d-flex justify-content-between ' onClick={() => console.log('view image')}>
                                <div class='d-flex align-items-center thumbnail-image-block'>
                                    <img alt='Item' className='img-fluid' src={page.item.item_preview.img}/>
                                </div>
                                <div class='align-items-between d-flex flex-column px-2 pt-1 thumbnail-link-block'>
                                    <b><a href={page.item.url}>Visit Website</a></b>
                                    <text>{page.item.item_preview.description}...</text>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* <div className='row'>
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
            <div className='row mt-5'>
                <div className='col-sm-6 offset-sm-3 text-center'>
                    <button className="btn btn-primary" onClick={() => dispatch(pageActions.updatePage({}, 0))}>Back</button>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
        </div>
    );
}

export default View;