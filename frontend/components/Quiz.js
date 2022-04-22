import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';

export function Quiz(props) {

  const {
    quiz,
    selectedAnswer,
    initialMessageState,
    fetchQuiz,
    selectAnswer,
    postAnswer
  } = props;
 
  useEffect(() => {
    fetchQuiz();
  }, []);

  const selectTheAnswer = (id) => {
    selectAnswer(id)
  }

  const submitTheAnswer = () => {
    console.log("baby steps");
    postAnswer(quiz, selectedAnswer);
  }

  console.log(quiz);


  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className={`answer ${selectedAnswer === quiz.answers[0].answer_id ? "selected" : "" }`} onClick={() => selectTheAnswer(quiz.answers[0].answer_id)}>
                {quiz.answers[0].text}
                <button>
                  {selectedAnswer === quiz.answers[0].answer_id ? "SELECTED" : "Select" }
                </button>
              </div>

              <div className={`answer ${selectedAnswer === quiz.answers[1].answer_id ? "selected" : "" }`} onClick={() => selectTheAnswer(quiz.answers[1].answer_id)}>
                {quiz.answers[1].text}
                <button>
                  {selectedAnswer === quiz.answers[1].answer_id ? "SELECTED" : "Select" }
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" disabled={selectedAnswer === null} onClick={() => submitTheAnswer(quiz, selectAnswer)}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer,
    infoMessage: state.infoMessage,
  }
}

export default connect(mapStateToProps, actionCreators)(Quiz)
