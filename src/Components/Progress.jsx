import React, { useContext } from 'react'
import { useQuize } from '../context/QuizContext'

const Progress = () => {

  const {index , questions , points , maxPossiblePoints , answer} = useQuize()
  const numQuestion = questions.length
  
  return (
    <header className='progress'>
        <progress max={numQuestion} value={index + Number(answer !== null)}/>
        <p>Questions <strong>{index + 1}</strong> / {numQuestion}</p>
        <p><strong>{points}</strong> / {maxPossiblePoints}</p>
    </header>
  )
}

export default Progress