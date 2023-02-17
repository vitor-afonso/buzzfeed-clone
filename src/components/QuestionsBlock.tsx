import React from 'react';
import { Content, StateTypes, Question } from '../../interfaces';
import QuestionBlock from './QuestionBlock';

const QuestionsBlock = ({ quizItem, state, dispatch }: { quizItem: Content; state: StateTypes; dispatch: Function }) => {
  return (
    <>
      <h2 className='title-block' id={String(quizItem.id)}>
        {quizItem.text}
      </h2>

      <div className='questions-container'>
        {quizItem?.questions.map((question: Question, _index) => (
          <QuestionBlock question={question} key={_index} dispatch={dispatch} state={state} quizItemId={quizItem.id} />
        ))}
      </div>
    </>
  );
};

export default QuestionsBlock;
