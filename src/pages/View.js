import '../App.css'
import gibson from './assets/gibson.png'
import { ProgressBar } from 'react-bootstrap';

const now = 60;

const progressInstance = <ProgressBar now={now} label={`${now}%`} />;

function View({page, viewPage}) {
    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-sm-6 offset-sm-3 d-flex justify-content-between'>
                    <h3>{page.item} $999.99</h3>
                    <button onClick={() => viewPage({number: 0, item: ""})} className="btn btn-primary">Back</button>
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-6 offset-sm-3'>
                    <img className='img-fluid' src={gibson}/>
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-6 offset-sm-3'>
                    <p><b>Description:</b> I've always wanted a Gibson SG so that I could be like the two greatest guitar players to ever
                    live... Angus Young and Jack Black</p>
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
                        <p className="form-control-no-border"><b>Savings Plan:</b> $25 from every "Zego Pay Check"</p>
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