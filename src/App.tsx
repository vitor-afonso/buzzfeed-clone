import React, { useEffect, useReducer, useRef, useState } from 'react';
import Title from './components/Title';
import axios from 'axios';
import { QuizData, Content } from './../interfaces';
import QuestionsBlock from './components/QuestionsBlock';
import { INITIAL_STATE, quizReducer } from './quizReducer';
import { ACTION_TYPES } from './quizActionTypes';

const App = () => {
  const [state, dispatch] = useReducer(quizReducer, INITIAL_STATE);

  // to prevent re re-calling of API
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      fetchData();
      return () => {
        effectRan.current = true;
      };
    }
  }, []);

  useEffect(() => {
    //here we set the initial unanswerd ids dinamically to the reducer initial state
    const unanswerdIds = state.quiz.content?.map(({ id }: Content) => id);
    dispatch({ type: ACTION_TYPES.UNANSWERD_QUESTION_ID, payload: unanswerdIds });
  }, [state.quiz]);

  useEffect(() => {
    //scroll to the highest unanswerd question
    if (state.unanswerdQuestionIds !== undefined) {
      const highestId = Math.min(...state.unanswerdQuestionIds);
      const highestElement = document.getElementById(String(highestId));
      highestElement?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state.unanswerdQuestionIds]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/quiz-item');
      dispatch({ type: ACTION_TYPES.FETCH_QUIZ, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='app'>
      <Title title={state.quiz.title} subtitle={state.quiz.subtitle} />

      {state.quiz.content?.map((content: Content, id: Content['id']) => (
        <QuestionsBlock quizItem={content} key={id} dispatch={dispatch} state={state} />
      ))}
    </div>
  );
};

export default App;
