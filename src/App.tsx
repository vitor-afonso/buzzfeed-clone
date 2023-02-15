import React, { useEffect, useRef, useState } from 'react';
import Title from './components/Title';
import axios from 'axios';
import { QuizData, Content } from './../interfaces';
import QuestionsBlock from './components/QuestionsBlock';

const App = () => {
  const [quiz, setQuiz] = useState<QuizData>();

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

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/quiz-item');
      setQuiz(response.data);
      console.log('fetchData response =>', response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Title title={quiz?.title} subtitle={quiz?.subtitle} />

      {quiz?.content.map((content: Content, id: Content['id']) => (
        <QuestionsBlock quizItem={content} key={id} />
      ))}
    </div>
  );
};

export default App;
