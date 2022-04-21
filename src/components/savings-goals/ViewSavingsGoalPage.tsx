import '../../App.css'
import { useSelector } from 'react-redux'
import { ProgressBar } from 'react-bootstrap'
import { RootState } from '../../redux/reducers'
import { BankAccount } from '../../library/types'
import { SavingsItemPlanProps, SavingsItemProps } from './types'
import { locateAccounts, findSavingsItemByName } from '../../library/userParser'
import { useParams, useNavigate, NavigateFunction, Navigate } from 'react-router-dom'

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
    let amount = props.item.saving_plan ? props.item.saving_plan.amount ?? '' : '';
    let cadence = props.item.saving_plan ? props.item.saving_plan.cadence ?? '' : '';

    return (props.fromAccount === {} || props.toAccount === {}) ? <div></div> : (
        <div className='row mt-5'>
            <div className='col-sm-6 offset-sm-3'>
                <div className="input-group">
                    <p className="form-control-no-border">
                        <b>Saving Plan</b> -
                        Transfer ${amount} from the <b>{(props.fromAccount as BankAccount).name}</b> to the
                        <b>{(props.toAccount as BankAccount).name}</b> - &nbsp;{cadence}
                    </p>
                </div>
            </div>
        </div>
    )
}

type SavingsProgressProps = { progressInstance: JSX.Element }

function SavingsProgress(props: SavingsProgressProps): JSX.Element {
    return (
        <div className='row mt-5'>
            <div className='col-sm-6 offset-sm-3 text-center'>
                {props.progressInstance}
            </div>
        </div>
    )
}

function SavingsItemPreview(props: SavingsItemProps): JSX.Element {
    const title = props.item.item_preview ? props.item.item_preview.title : props.item.name;
    return (
        <div className='row'>
            <div className='col-sm-6 offset-sm-3 d-flex justify-content-between'>
                <h3>{title}</h3>
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
    let amount = item.amount ?? 0.01;
    const progress: number = Math.round(10 / (amount * 100));
    let [toAccount, fromAccount]: Array<BankAccount>|Array<{}> = plaid_items ? locateAccounts(plaid_items, item) : [{}, {}];

    return item ? (
        <div className='container mt-5'>
            <SavingsItemTitle item={item} />
            <SavingsItemPreview item={item} />
            { (item.saving_plan && item.saving_plan.amount) && <SavingsProgress progressInstance={<ProgressBar now={progress} label={`${progress}%`} />} />}
            { (item.saving_plan && item.saving_plan.amount) && <SavingPlan item={item} fromAccount={fromAccount} toAccount={toAccount} /> }
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
    ) : <Navigate to='/goals' />;
}

export default ViewSavingsGoalPage;
