import React from 'react'
import { useQuize } from '../context/QuizContext'

const Finish = () => {


    const { points, maxPossiblePoints, heighscore , dispatch} = useQuize()

    
    const percentage = (points / maxPossiblePoints) * 100

    let emoji
    if (percentage === 100) emoji = "🏅"
    if (percentage < 100) emoji = "💩"


    return (
        <>
            <p className='result'>
                <span>{emoji}</span> You scord <strong>{points}</strong> out of
                {maxPossiblePoints}
                ({(Math.ceil(percentage))}%)
            </p>
            <p className='highscore'>(hight score : {heighscore})</p>
            <button className='btn btn-ui' onClick={() => { dispatch({ type: "restart" }) }}>Restart Quiz</button>
        </>
    )
}

export default Finish