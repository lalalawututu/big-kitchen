import costContainer from '../../../container/cost'

const CollapseHeader = props => {
    let costIndex = costContainer.useContainer();
    var {data} = props;
    return (
        <div>
            <div className="produce-container produce-containerOpen">
                <div className="costNum">
                    <div className='costNum_row'>  
                        <div className="survey-box">
                            <h5>今日消耗</h5>
                            <span style={{color:'#FF4B4B'}}>{data.todayCost}</span>
                        </div>
                        <div className="survey-box">
                            <h5>昨日消耗</h5>
                            <span style={{color:'#24B5D0'}}>{data.yesterdayCost}</span>
                        </div>
                        <div className="survey-box">
                            <h5>周消耗</h5>
                            <span>{data.weekCost}</span>
                        </div>
                        <div className="survey-box">
                            <h5>月消耗</h5>
                            <span>{data.monthCost}</span>
                        </div>
                        <div className="survey-box">
                            <h5>季度消耗</h5>
                            <span>{data.quarterCost}</span>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default CollapseHeader