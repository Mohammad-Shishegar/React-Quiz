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
import { useQuize } from '../context/QuizContext'


const App = () => {

  const {status} = useQuize()

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === "loading" && <Loading />}
        {status === "error" && <Error />}
        {status === "ready" && <StarterScreen />}
        {status === "active" && (
          <>
            <Progress/>
            <Question/>
            <Footer>
              <NextButton/>
              <Timer />
            </Footer>
          </>
        )}
        {status === "finished" && <Finish />}
      </Main>
    </div>
  )
}

export default App