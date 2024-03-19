import React from 'react'
import { useQuize } from '../context/QuizContext'

const StarterScreen = () => {

  const {numQuestions , dispatch} = useQuize()

  return (
    <div className='start'>
        <h2>Welcome to the React Quiz!</h2>
        <h3>{numQuestions} questions for test your react mastery</h3>
        <button className='btn btn-ui' onClick={()=>dispatch({type : "start"})}>Lets Start</button>
    </div>
  )
}

export default StarterScreen