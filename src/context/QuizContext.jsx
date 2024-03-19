import { createContext, useContext, useReducer , useEffect} from "react";
import question from "../questions.json"

const QuizeContext = createContext()

const initialState = {
    questions: [],
    // loading , error , ready , active , finish
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    heighscore: 0,
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
            return { ...state, status: "active", secondsRemaining: state.questions.length * SECS_PER_MINUTES }
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
            return {
                ...state, secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? "finished" : state.status
            }


        default:
            throw new Error("Action Unknow!")
    }
}


const QuizeProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const { status, questions, index, answer, points, heighscore, secondsRemaining } = state

    const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0)

    useEffect(() => {

        const getData = async () => {
          try {
            // const res = await fetch("http://localhost:9000/questions") // comment this line because for publish github
            console.log(question.questions)
            // if (!res.ok)
            //   throw new Error
            const data = question.questions
            dispatch({ type: "dataRecived", payload: data })
          } catch (er) {
            dispatch({ type: "dataFailed" })
          }
        }
    
        getData()
    
      }, [])


    return (
        <QuizeContext.Provider value={{
            status,
            questions,
            index,
            answer,
            dispatch,
            points,
            heighscore,
            secondsRemaining ,
            maxPossiblePoints , 
            numQuestions : questions.length
        }}>
            {children}
        </QuizeContext.Provider>
    )
}

const useQuize = () => {
    const context = useContext(QuizeContext)
    if (context === undefined)
        throw new Error("use context outside provider")
    return context
}

export { QuizeProvider, useQuize }