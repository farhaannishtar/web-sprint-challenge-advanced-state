import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {

  const {
    form,
    infoMessage,
    inputChange,
    postQuiz
  } = props;

  const onChange = evt => {
    const { name, value } = evt.target
    inputChange({ name, value })
  }

  const onSubmit = evt => {
    evt.preventDefault();
    postQuiz(form.newQuestion, form.newTrueAnswer, form.newFalseAnswer);
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input value={form.newQuestion} name="newQuestion" maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input value={form.newTrueAnswer} name="newTrueAnswer" maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input value={form.newFalseAnswer} name="newFalseAnswer" maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled={(form.newQuestion.trim().length > 0) 
                                                  && (form.newTrueAnswer.trim().length > 0) 
                                                  && (form.newFalseAnswer.trim().length > 0) ? false : true}>Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    form: state.form,
    infoMessage: state.infoMessage,
  }
}

export default connect(mapStateToProps, actionCreators)(Form)