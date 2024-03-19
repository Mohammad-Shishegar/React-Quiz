import React from 'react'

const Finish = ({ points, MaxPossiblePoints, heighscore , dispatch}) => {

    const percentage = (points / MaxPossiblePoints) * 100

    let emoji
    if (percentage === 100) emoji = "🏅"
    if (percentage < 100) emoji = "💩"


    return (
        <>
            <p className='result'>
                <span>{emoji}</span> You scord <strong>{points}</strong> out of
                {MaxPossiblePoints}
                ({(Math.ceil(percentage))}%)
            </p>
            <p className='highscore'>(hight score : {heighscore})</p>
            <button className='btn btn-ui' onClick={() => { dispatch({ type: "restart" }) }}>Restart Quiz</button>
        </>
    )
}

export default Finish