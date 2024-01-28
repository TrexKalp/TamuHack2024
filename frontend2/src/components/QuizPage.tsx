// QuizPage.tsx
import React, { useState } from 'react';
import ImageLoader from "./ImageLoader.tsx"; // Importing the CSS for styling
import {Button, Center, VStack, Text} from '@chakra-ui/react'

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
      question: "What is the capital of Texas?",
      answers: [
        { id: 'a', text: "Austin" },
        { id: 'b', text: "Dallas" },
        { id: 'c', text: "San Antonio" },
        { id: 'd', text: "Houston" },
        // More answers...
      ],
      correctAnswer: 'a',
      explanation: "Austin is the capital of Texas.",
      explanationMedia: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/View_of_Downtown_Austin_from_Pfluger_Pedestrian_Bridge_October_2022.jpg/640px-View_of_Downtown_Austin_from_Pfluger_Pedestrian_Bridge_October_2022.jpg" // Replace with actual URL
    },
    {
      question: "What is the capital of France?",
      answers: [
        { id: 'a', text: "Marseille" },
        { id: 'b', text: "Paris" },
        // More answers...
      ],
      correctAnswer: 'b',
      explanation: "Paris is the capital of France.",
      explanationMedia: "https://example.com/image_or_video_url.jpg" // Replace with actual URL
    }
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

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswerSubmitted(false);
      setShowExplanation(false);
      setSelectedAnswer(null);
    } else {
      // No more questions, navigate to the home page or show a completion message
      alert("Quiz completed!"); // Replace with your navigation logic
    }
  };

  return (
      <Center>
        <VStack spacing={4}>
          <Text fontSize="2xl">{questions[currentQuestionIndex].question}</Text>
          <VStack>
            {questions[currentQuestionIndex].answers.map((answer: IAnswer) => (
                <Button
                    key={answer.id}
                    onClick={() => handleAnswerSelect(answer.id)}
                    colorScheme="blue"
                    isDisabled={isAnswerSubmitted}
                    variant={selectedAnswer === answer.id ? 'solid' : 'outline'}
                >
                  {answer.text}
                </Button>
            ))}
          </VStack>
          {!isAnswerSubmitted && selectedAnswer &&
              <Button colorScheme="blue" onClick={handleSubmit}>Submit</Button>
          }
          {showExplanation && (
              <VStack>
                <Text>
                  {selectedAnswer === questions[currentQuestionIndex].correctAnswer
                      ? `Correct! ${questions[currentQuestionIndex].explanation}`
                      : `Incorrect. ${questions[currentQuestionIndex].explanation}`}
                </Text>
                <ImageLoader src={questions[currentQuestionIndex].explanationMedia}/>
                <Button colorScheme="blue" onClick={handleNextQuestion}>Next Question</Button>
              </VStack>
          )}
        </VStack>
      </Center>
  );
};

export default QuizPage;
