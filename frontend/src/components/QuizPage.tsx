// QuizPage.tsx
import React, { useEffect, useState } from "react";
import { Button, Center, VStack, Text, Flex, Spinner } from "@chakra-ui/react";
import OpenAI from "openai";
import { globalTopic } from "./GlobalTopic.tsx";

class IQuestion {
  question: string;
  options: string[];
  answer: string;

  constructor(question: string, options: string[], answer: string) {
    this.question = question;
    this.options = options;
    this.answer = answer;
  }

  // You can also add methods to the class if needed
}

const fetchQuestions = async (): Promise<IQuestion[]> => {
  // TODO: Setup OpenAI API key
  // TODO: https://platform.openai.com/docs/quickstart?context=node#:~:text=for%20all%20projects-,(,-recommended)

  const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
  });

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Create 5 simple trivia quiz questions about the " +
          globalTopic["topic"] +
          ", suitable for young children. Ensure the questions are True/False or multiple choice with 4 answer choices, avoid complex language or controversial content, and do not involve calculations or patterns. Listed below is an example of a good output. Do not reply to me with a greeting at all.\n" +
          "\n" +
          '"question|True or False: The Pyramids of Giza are one of the Seven Wonders of the Ancient World.|answer|True|options|True|False\\n" +\n' +
          '      "question|Which river flows near the Pyramids of Giza?|answer|Nile|options|Nile|Amazon|Mississippi|Yangtze\\n" +\n' +
          '      "question|What shape are the Pyramids of Giza?|answer|Triangle|options|Triangle|Square|Circle|Hexagon\\n";',
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const output = completion.choices[0].message.content as string;

  const lines = output.split("\n");

  let questionsArray = [];

  for (let i = 0; i < lines.length - 1; i++) {
    let temp = lines[i].substring("question".length + 1);
    let question = temp.substring(0, temp.indexOf("|"));
    temp = temp.substring(temp.indexOf("|") + 1);

    temp = temp.substring(temp.indexOf("|") + 1);

    let answer = temp.substring(0, temp.indexOf("|"));
    temp = temp.substring(temp.indexOf("|") + 1);

    temp = temp.substring(temp.indexOf("|") + 1);

    let options = temp;
    temp = temp.substring(temp.indexOf("|") + 1);

    let optionsArr = options.split("|");

    console.log({ question });
    console.log({ answer });
    console.log({ options });

    questionsArray[i] = new IQuestion(question, optionsArr, answer);
  }

  console.log(questionsArray);

  return questionsArray;
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
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
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
      alert(`Quiz completed! You have gained ${correctCount} points!`);
      // TODO: Replace the above alert with API call to backend
      const points = Number(localStorage.getItem("points")) || 0;
      localStorage.setItem("points", String(points + correctCount));
    }
  };

  // Check if questions are loaded
  if (questions.length === 0) {
    return (
      <Flex direction="column" align="center" justify="center" height="80vh">
        <VStack spacing={5}>
          <Text fontSize="2xl">Loading questions...</Text>
          <Spinner size="xl" color="blue.500" />
        </VStack>
      </Flex>
    );
  }

  return (
    <Flex direction="column" align="center" justify="center" height="80vh">
      <VStack spacing={4}>
        <Text fontSize="2xl" textAlign="center" mx={5}>
          {questions[currentQuestionIndex].question}
        </Text>
        <VStack>
          {questions[currentQuestionIndex].options.map((answer: string) => (
            <Button
              key={answer}
              onClick={() => handleAnswerSelect(answer)}
              colorScheme="blue"
              isDisabled={isAnswerSubmitted}
              variant={selectedAnswer === answer ? "solid" : "outline"}
            >
              {answer}
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
              {selectedAnswer === questions[currentQuestionIndex].answer
                ? "Correct!"
                : "Incorrect."}
            </Text>
            <Button colorScheme="blue" onClick={handleNextQuestion}>
              Next Question
            </Button>
          </VStack>
        )}
      </VStack>
    </Flex>
  );
};

export default QuizPage;
