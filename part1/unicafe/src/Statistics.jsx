import StatisticLine from "./StatisticLine ";

const Statistics = (props) => {
    const good = props.good;
    const neutral = props.neutral;
    const bad = props.bad;
    const total = props.total;
    
    if (total === 0) {
        return (<div>No feedback given</div>);
    }
    else{
        return (
            <>
                <table>
                    <tbody>
                    <StatisticLine text='good' value={good}/>
                    <StatisticLine text='neutral' value={neutral}/>
                    <StatisticLine text='bad' value={bad}/>
                    <tr>
                        <td>all</td>
                        <td>{total}</td>
                    </tr>
                    <tr>
                        <td>average</td>
                        <td>{total ? ( (good * 1) + (neutral * 0) + (bad * -1) ) / total : 0}</td>
                    </tr>
                    <tr>
                        <td>positive</td>
                        <td>{total ? (good / total) * 100 : 0} %</td>
                    </tr>
                    </tbody>
                </table>
            </>
        );
    }
    
}

export default Statistics;