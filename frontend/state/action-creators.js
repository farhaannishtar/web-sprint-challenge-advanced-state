import * as types from './action-types';
import axios from 'axios'


// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return { 
    type: types.MOVE_CLOCKWISE,
  }
}

export function moveCounterClockwise() {
  return { 
    type: types.MOVE_COUNTERCLOCKWISE,
  }
}

export function selectAnswer(id) { 
  return { 
    type: types.SET_SELECTED_ANSWER,
    payload: id,
  }
}

export function setMessage() { }

export function setQuiz() { }

export function inputChange({name, value}) { 
  return {
    type: types.INPUT_CHANGE,
    payload: { name, value },
  }
}

export function resetForm() { }

// ❗ Async action creators
export const fetchQuiz = () => dispatch => {
  // First, dispatch an action to reset the quiz state

  // (so the "Loading next quiz..." message can display)
  // On successful GET:
  // - Dispatch an action to send the obtained quiz to its state
  axios.get('http://localhost:9000/api/quiz/next')
    .then(res => {
      // console.log(res.data);
      dispatch({ type: types.SET_QUIZ_INTO_STATE, payload: res.data })
    })
    .catch(err => {
      console.log(err);
    })

}

export const postAnswer = (quiz, selectedAnswer) => dispatch => {
  // On successful POST:
  // - Dispatch an action to reset the selected answer state
  // - Dispatch an action to set the server message to state
  // - Dispatch the fetching of the next quiz
  dispatch(selectAnswer(selectAnswer));
  axios.post('http://localhost:9000/api/quiz/answer', {"quiz_id": quiz.quiz_id, "answer_id": selectedAnswer})
    .then(res => {
      console.log(res.data.message);
      dispatch({ type: types.SET_INFO_MESSAGE, payload: res.data.message })
      dispatch(fetchQuiz())
    })
    .catch(err => {
      console.log(err);
    })

}
export function postQuiz() {
  return function (dispatch) {
  // On successful POST:
  // - Dispatch the correct message to the the appropriate state
  // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, 
// and put an appropriate error message in state
