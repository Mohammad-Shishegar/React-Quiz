import React from 'react'
import { useQuize } from '../context/QuizContext'

const NextButton = () => {

    const {dispatch , answer , index , numQuestions} = useQuize()

    if (answer === null) 
    return null

    if (index < numQuestions - 1) return (
        <button className='btn btn-ui' onClick={()=>{dispatch({type : "nextQuestion"})}}>Next</button>
    )
    if (index === numQuestions - 1) return (
        <button className='btn btn-ui' onClick={()=>{dispatch({type : "finish"})}}>Finish</button>
    )

}

export default NextButton