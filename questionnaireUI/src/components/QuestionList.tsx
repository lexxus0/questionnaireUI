import { IQuestion } from "../interfaces/interfaces";
import QuestionItem from "./Questionitem";

interface QuestionListProps {
  questions: IQuestion[];
  onAddQuestion: () => void;
  onTextChange: (index: number, text: string) => void;
  onTypeChange: (
    index: number,
    type: "text" | "single_choice" | "multiple_choices"
  ) => void;
  onRemoveQuestion: (index: number) => void;
  onAnswerChange: (qIndex: number, aIndex: number, text: string) => void;
  onAddAnswer: (index: number) => void;
  onRemoveAnswer: (qIndex: number, aIndex: number) => void;
  moveQuestion: (fromIndex: number, toIndex: number) => void;
}

export default function QuestionList({
  questions,
  onAddQuestion,
  onTextChange,
  onTypeChange,
  onRemoveQuestion,
  onAnswerChange,
  onAddAnswer,
  onRemoveAnswer,
  moveQuestion,
}: QuestionListProps) {
  return (
    <div>
      {questions.map((question, index) => (
        <QuestionItem
          key={index}
          question={question}
          index={index}
          onTextChange={onTextChange}
          onTypeChange={onTypeChange}
          onRemove={onRemoveQuestion}
          onAnswerChange={onAnswerChange}
          onAddAnswer={onAddAnswer}
          onRemoveAnswer={onRemoveAnswer}
          moveQuestion={moveQuestion}
        />
      ))}
      <button
        onClick={onAddQuestion}
        className="mt-4 text-pink-500 cursor-pointer "
      >
        Add Question
      </button>
    </div>
  );
}
