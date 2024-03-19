import React from 'react'
import Options from './Options'
import { useQuize } from '../context/QuizContext'

const Question = () => {


  const {dispatch , answer , questions , index} = useQuize()

  const question = questions[index]

  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch = {dispatch} answer = {answer}/>
    </div>
  )
}

export default Question