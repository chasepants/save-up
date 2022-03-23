import '../App.css'
import { ProgressBar } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { locateAccounts, findSavingsItemByName } from '../../utils/userParser'
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom'
import { RootState } from '../../redux/reducers'
import { BankAccount } from '../../utils/types'
import { SavingsItemPlanProps, SavingsItemProps } from './types'

function HypeBoard(): JSX.Element {
    return (
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
    )
}

function SavingsItemTitle(props: SavingsItemProps): JSX.Element {
    return props.item.item_preview ? (
            <div className='row my-3 item-url-row'>
                <div className='col-sm-6 offset-sm-3'>
                    <div className='border d-flex justify-content-between ' onClick={() => console.log('view image')}>
                        <div className='d-flex align-items-center thumbnail-image-block'>
                            <img alt='Item' className='img-fluid' src={props.item.item_preview.img ?? props.item.item_preview.favicon}/>
                        </div>
                        <div className='align-items-between d-flex flex-column px-2 pt-1 thumbnail-link-block'>
                            <b><a href={props.item.url}>Visit Website</a></b>
                            <p>{props.item.item_preview.description}...</p>
                        </div>
                    </div>
                </div>
            </div>
        ) : <div></div>
}

function SavingPlan(props: SavingsItemPlanProps): JSX.Element {
    return (props.fromAccount === {} || props.fromAccount === {}) ? <div></div> : (
        <div className='row mt-5'>
            <div className='col-sm-6 offset-sm-3'>
                <div className="input-group">
                    <p className="form-control-no-border">
                        <b>Saving Plan</b> -
                        Transfer ${props.item.saving_plan.amount} from the <b>{(props.fromAccount as BankAccount).name}</b> to the
                        <b>{(props.toAccount as BankAccount).name}</b> - &nbsp;{props.item.saving_plan.cadence}
                    </p>
                </div>
            </div>
        </div>
    )
}

function SavingsProgress({ progressInstance }): JSX.Element {
    return (
        <div className='row mt-5'>
            <div className='col-sm-6 offset-sm-3 text-center'>
                {progressInstance}
            </div>
        </div>
    )
}

function SavingsItemPreview(props: SavingsItemProps): JSX.Element {
    return (
        <div className='row'>
            <div className='col-sm-6 offset-sm-3 d-flex justify-content-between'>
                <h3>{props.item.item_preview.title}</h3>
                <h3>${props.item.amount}</h3>
            </div>
        </div>
    )
}

function ViewSavingsGoalPage(): JSX.Element {
    let { item_name } = useParams();
    const user = useSelector((state: RootState) => state.user)
    const item = findSavingsItemByName(item_name, user.savings_items)
    const plaid_items = useSelector((state: RootState) => state.user.plaid_items)

    const navigate: NavigateFunction = useNavigate()
    const progress: number = Math.round(10 / (item.amount * 100));
    let [toAccount, fromAccount]: Array<BankAccount>|Array<{}> = plaid_items ? locateAccounts(plaid_items, item) : [{}, {}];

    return (
        <div className='container mt-5'>
            <SavingsItemTitle item={item} />
            <SavingsItemPreview item={item} />
            <SavingsProgress progressInstance={<ProgressBar now={progress} label={`${progress}%`} />} />
            <SavingPlan item={item} fromAccount={fromAccount} toAccount={toAccount} />
            <HypeBoard />
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
