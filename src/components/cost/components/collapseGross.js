import costContainer from '../../../container/cost'

const CollapseHeader = props => {
    let costIndex = costContainer.useContainer();
    var { data } = props;
    return (
        <div>
            <div className="produce-container">
                <div className="costNum">
                    <div className='costNum_row'>
                        <div className="survey-box survey-boxGross ">
                            <div>
                                <h5>今日毛利</h5>
                                <span style={{ color: '#FF4B4B' }}>{data.todayCost}</span>
                            </div>
                            <div className='GrossRate'>{data.todayRate}%</div>
                        </div>
                        <div className="survey-box survey-boxGross ">
                            <div>
                                <h5>昨日毛利</h5>
                                <span style={{ color: '#24B5D0' }}>{data.yesterdayCost}</span>
                            </div>
                            <div className='GrossRate'>{data.yesterdayRate}%</div>

                        </div>
                        <div className="survey-box survey-boxGross ">
                            <div>
                                <h5>周毛利</h5>
                                <span>{data.weekCost}</span>
                            </div>
                            <div className='GrossRate'>{data.weekRate}%</div>

                        </div>
                        <div className="survey-box survey-boxGross ">
                            <div>
                                <h5>月毛利</h5>
                                <span>{data.monthCost}</span>
                            </div>
                            <div className='GrossRate'>{data.monthRate}%</div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollapseHeader