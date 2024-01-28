// QuizPage.tsx
import React, { useEffect, useState } from "react";
import ImageLoader from "./ImageLoader.tsx"; // Importing the CSS for styling
import { Button, Center, VStack, Text } from "@chakra-ui/react";
// import OpenAI from "openai";

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

const fetchQuestions = async (): Promise<IQuestion[]> => {
  // TODO: Setup OpenAI API key
  // TODO: https://platform.openai.com/docs/quickstart?context=node#:~:text=for%20all%20projects-,(,-recommended)

  const openai = new OpenAI();

  const prompt =
    "Imagine a child looking outside an airplane window. I want you to generate trivia quiz questions for the various landmarks that the child will presumably see to pique their interest into learning about that landmark. The questions should be simple and either be True/False or multiple choice. The questions should not involve any calculations or pattern matching. The questions and answer choices should not be overly wordy or complicated, use any jargon or complicated vocabulary, or cover controversial or inappropriate content. If questions are multiple-choice, they should have 4 answer choices, no less and no more. Remember, these questions should be answerable and appropriate by young children.\n" +
    "\n" +
    'However, be sure not to ask questions whose answers are explicitly stated or otherwise immediately obvious. For example, consider the question, "Which country is the Great Wall of China located in?" The answer is explicitly stated, making the question unusable for learning.\n' +
    "\n" +
    "Now that you know the regulations for these quiz questions, please generate 2 to 4 questions on the Pyramids of Giza. Please output the questions in .JSON format to make for easier processing.";

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  const questionsArray: IQuestion[] = JSON.parse(
    completion.choices[0].message.content as string
  );

  return questionsArray.length > 0
    ? questionsArray
    : [
        {
          question: "What is the capital of Texas?",
          answers: [
            { id: "a", text: "Austin" },
            { id: "b", text: "Dallas" },
            { id: "c", text: "San Antonio" },
            { id: "d", text: "Houston" },
            // More answers...
          ],
          correctAnswer: "a",
          explanation: "Austin is the capital of Texas.",
          explanationMedia:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/View_of_Downtown_Austin_from_Pfluger_Pedestrian_Bridge_October_2022.jpg/640px-View_of_Downtown_Austin_from_Pfluger_Pedestrian_Bridge_October_2022.jpg", // Replace with actual URL
        },
        {
          question: "What is the capital of France?",
          answers: [
            { id: "a", text: "Marseille" },
            { id: "b", text: "Paris" },
            // More answers...
          ],
          correctAnswer: "b",
          explanation: "Paris is the capital of France.",
          explanationMedia: "https://example.com/image_or_video_url.jpg", // Replace with actual URL
        },
      ];
};

const QuizPage: React.FC = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0); // Correct answers count
  const [incorrectCount, setIncorrectCount] = useState<number>(0); // Incorrect answers count

  useEffect(() => {
    fetchQuestions().then((fetchedQuestions) => {
      setQuestions(fetchedQuestions);
    });
  }, []);

  const handleAnswerSelect = (answerId: string) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(answerId);
    }
  };

  const handleSubmit = () => {
    setIsAnswerSubmitted(true);
    setShowExplanation(true);
    // Update correct and incorrect count
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setCorrectCount(correctCount + 1);
    } else {
      setIncorrectCount(incorrectCount + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswerSubmitted(false);
      setShowExplanation(false);
      setSelectedAnswer(null);
    } else {
      // No more questions, navigate to the home page or show a completion message
      alert(
        `Quiz completed! Correct answers: ${correctCount}, Incorrect answers: ${incorrectCount}`
      );
      // TODO: Replace the above alert with API call to backend
    }
  };

  // Check if questions are loaded
  if (questions.length === 0) {
    return <Center>Loading questions...</Center>;
  }

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
              variant={selectedAnswer === answer.id ? "solid" : "outline"}
            >
              {answer.text}
            </Button>
          ))}
        </VStack>
        {!isAnswerSubmitted && selectedAnswer && (
          <Button colorScheme="blue" onClick={handleSubmit}>
            Submit
          </Button>
        )}
        {showExplanation && (
          <VStack>
            <Text>
              {selectedAnswer === questions[currentQuestionIndex].correctAnswer
                ? `Correct! ${questions[currentQuestionIndex].explanation}`
                : `Incorrect. ${questions[currentQuestionIndex].explanation}`}
            </Text>
            <ImageLoader
              src={questions[currentQuestionIndex].explanationMedia}
            />
            <Button colorScheme="blue" onClick={handleNextQuestion}>
              Next Question
            </Button>
          </VStack>
        )}
      </VStack>
    </Center>
  );
};

export default QuizPage;
