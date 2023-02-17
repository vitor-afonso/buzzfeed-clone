import React, { useEffect } from 'react';
import { StateTypes } from '../../interfaces';
import { ACTION_TYPES } from '../quizActionTypes';

const AnswerBlock = ({ state, dispatch }: { state: StateTypes; dispatch: Function }) => {
  useEffect(() => {
    state.quiz?.answers.forEach((answer) => {
      if (state.chosenAnswerItems.includes(answer.combination[0]) && state.chosenAnswerItems.includes(answer.combination[1]) && state.chosenAnswerItems.includes(answer.combination[2])) {
        dispatch({ type: ACTION_TYPES.RESULT, payload: answer });
      }
    });
  }, [state.chosenAnswerItems]);

  return (
    <div id='answer-block' className='answer-block'>
      <h2>{state.result?.text}</h2>
      <img src={state.result?.image} alt={state.result?.alt} />
    </div>
  );
};

export default AnswerBlock;
