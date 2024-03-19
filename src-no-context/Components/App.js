import React, { useEffect, useReducer } from 'react'
import DateCounter from './DateCounter'
import Header from './Header'
import Main from './Main'
import Loading from "./Loader"
import Error from './Error'
import StarterScreen from './StarterScreen'
import Question from './Question'
import NextButton from './NextButton'
import Progress from './Progress'
import Finish from './Finish'
import Footer from './Footer'
import Timer from './Timer'


const initialState = {
  questions: [],
  // loading , error , ready , active , finish
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  heighscore: 0 ,
  secondsRemaining: 10
}

const SECS_PER_MINUTES = 30

const reducer = (state, action) => {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" }

    case "dataFailed":
      return { ...state, status: "error" }
    case "start":
      return { ...state, status: "active" , secondsRemaining : state.questions.length * SECS_PER_MINUTES }
    case "newAnswer":
      const question = state.questions.at(state.index)
      return {
        ...state, answer: action.payload, points: action.payload ===
          question.correctOption ? state.points + question.points : state.points
      }

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null }
    case "finish":
      return { ...state, status: "finished", heighscore: state.points > state.heighscore ? state.points : state.heighscore }
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" }
    case "tick":
      return { ...state , secondsRemaining : state.secondsRemaining - 1 ,
        status : state.secondsRemaining === 0 ? "finished" : state.status
      }


    default:
      throw new Error("Action Unknow!")
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { status, questions, index, answer, points, heighscore , secondsRemaining} = state

  const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0)

  useEffect(() => {

    const getData = async () => {
      try {
        const res = await fetch("http://localhost:9000/questions")
        if (!res.ok)
          throw new Error
        const data = await res.json()
        dispatch({ type: "dataRecived", payload: data })
      } catch (er) {
        dispatch({ type: "dataFailed" })
      }
    }

    getData()

  }, [])

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === "loading" && <Loading />}
        {status === "error" && <Error />}
        {status === "ready" && <StarterScreen numQuestions={questions.length} dispatch={dispatch} />}
        {status === "active" && (
          <>
            <Progress
              index={index}
              answer={answer}
              numQuestion={questions.length}
              points={points}
              maxPossiblePoints={maxPossiblePoints} />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch} />
            <Footer>
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={questions.length}
              />
              <Timer dispatch={dispatch} secondsRemaining = {secondsRemaining}/>
            </Footer>
          </>
        )}
        {status === "finished" && <Finish dispatch={dispatch} points={points} MaxPossiblePoints={maxPossiblePoints} heighscore={heighscore} />}
      </Main>
    </div>
  )
}

export default App