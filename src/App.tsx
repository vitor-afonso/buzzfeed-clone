import React, { useEffect, useReducer, useRef } from 'react';
import Title from './components/Title';
import axios from 'axios';
import { QuizData, Content } from './../interfaces';
import QuestionsBlock from './components/QuestionsBlock';
import { INITIAL_STATE, quizReducer } from './quizReducer';
import { ACTION_TYPES } from './quizActionTypes';
import AnswerBlock from './components/AnswerBlock';

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
    //scroll to the highest unanswerd question & to answerd block
    if (state.unanswerdQuestionIds && state.chosenAnswerItems.length > 0) {
      if (state.unanswerdQuestionIds.length > 0) {
        const highestId = Math.min(...state.unanswerdQuestionIds);
        //should change to ref
        const highestElement = document.getElementById(String(highestId));
        highestElement?.scrollIntoView({ behavior: 'smooth' });
      }

      if (state.unanswerdQuestionIds.length <= 0 && state.chosenAnswerItems.length >= 1) {
        dispatch({ type: ACTION_TYPES.SHOW_ANSWER, payload: true });
        //should change to ref
        const answerBlock = document.getElementById('answer-block');
        answerBlock?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [state.unanswerdQuestionIds, state.chosenAnswerItems, state.showAnswer]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://buzzfeed-clone.onrender.com/quiz-item');
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
      {state.showAnswer && <AnswerBlock state={state} dispatch={dispatch} />}
    </div>
  );
};

export default App;
