import React from 'react';
import { Content, Question } from '../../interfaces';
import QuestionBlock from './QuestionBlock';

const QuestionsBlock = ({ quizItem }: { quizItem: Content }) => {
  return (
    <>
      <h2 id={String(quizItem.id)}>{quizItem.text}</h2>

      <div className='questions-container'>
        {quizItem?.questions.map((question: Question, _index) => (
          <QuestionBlock question={question} key={_index} />
        ))}
      </div>
    </>
  );
};

export default QuestionsBlock;
