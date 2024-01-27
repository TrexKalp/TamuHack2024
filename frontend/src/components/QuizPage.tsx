// QuizPage.tsx
import React, { useState } from 'react';
import './QuizPage.css'; // Importing the CSS for styling

interface IAnswer {
  id: string;
  text: string;
}

const QuizPage: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const questions = {
    question: "Your Quiz Question Here",
    answers: [
      { id: 'a', text: "Answer A" },
      { id: 'b', text: "Answer B" },
      { id: 'c', text: "Answer C" },
      { id: 'd', text: "Answer D" }
    ]
  };

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
  };

  return (
      <div className="quiz-container">
        <h1>{questions.question}</h1>
        <div className="answers">
          {questions.answers.map((answer: IAnswer) => (
              <div
                  key={answer.id}
                  className={`answer ${selectedAnswer === answer.id ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelect(answer.id)}
              >
                {answer.text}
              </div>
          ))}
        </div>
      </div>
  );
};

export default QuizPage;
