// QuizPage.tsx
import React, { useState } from 'react';
import './QuizPage.css'; // Importing the CSS for styling

interface IAnswer {
  id: string;
  text: string;
}

interface IQuestion {
  question: string;
  answers: IAnswer[];
  correctAnswer: string;
  explanation: string;
  explanationMedia: string; // URL to an image or a video
}

const QuizPage: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const questions: IQuestion[] = [
    {
      question: "First Quiz Question",
      answers: [
        { id: 'a', text: "Answer A" },
        { id: 'b', text: "Answer B" },
        // More answers...
      ],
      correctAnswer: 'a',
      explanation: "Explanation for why the correct answer is A.",
      explanationMedia: "https://example.com/image_or_video_url.jpg" // Replace with actual URL
    },
    // More questions...
  ];

  const handleAnswerSelect = (answerId: string) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(answerId);
    }
  };

  const handleSubmit = () => {
    setIsAnswerSubmitted(true);
    setShowExplanation(true);
  };

  return (
      <div className="quiz-container">
        <h1>{questions[currentQuestionIndex].question}</h1>
        <div className="answers">
          {questions[currentQuestionIndex].answers.map((answer: IAnswer) => (
              <div
                  key={answer.id}
                  className={`answer ${selectedAnswer === answer.id ? 'selected' : ''} ${isAnswerSubmitted ? 'submitted' : ''}`}
                  onClick={() => handleAnswerSelect(answer.id)}
              >
                {answer.text}
              </div>
          ))}
        </div>
        {!isAnswerSubmitted && selectedAnswer &&
            <button onClick={handleSubmit}>Submit Answer</button>
        }
        {showExplanation && (
            <div className="explanation">
              {selectedAnswer === questions[currentQuestionIndex].correctAnswer
                  ? <p>Correct! {questions[currentQuestionIndex].explanation}</p>
                  : <p>Incorrect. {questions[currentQuestionIndex].explanation}</p>}
              <img src={questions[currentQuestionIndex].explanationMedia} alt="Explanation" />
            </div>
        )}
      </div>
  );
};

export default QuizPage;
