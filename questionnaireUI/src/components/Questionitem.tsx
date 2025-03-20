import { useDrag, useDrop } from "react-dnd";
import { FaTrash } from "react-icons/fa";
import Select from "react-select";
import { IQuestion } from "../interfaces/interfaces";

interface QuestionItemProps {
  question: IQuestion;
  index: number;
  onTextChange: (index: number, text: string) => void;
  onTypeChange: (
    index: number,
    type: "text" | "single_choice" | "multiple_choices"
  ) => void;
  onRemove: (index: number) => void;
  onAnswerChange: (qIndex: number, aIndex: number, text: string) => void;
  onAddAnswer: (index: number) => void;
  onRemoveAnswer: (qIndex: number, aIndex: number) => void;
  moveQuestion: (fromIndex: number, toIndex: number) => void;
}

const questionTypes = [
  { value: "text", label: "Text" },
  { value: "single_choice", label: "Single Choice" },
  { value: "multiple_choices", label: "Multiple Choice" },
];

export default function QuestionItem({
  question,
  index,
  onTextChange,
  onTypeChange,
  onRemove,
  onAnswerChange,
  onAddAnswer,
  onRemoveAnswer,
  moveQuestion,
}: QuestionItemProps) {
  const [, drag] = useDrag({
    type: "question",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "question",
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveQuestion(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => {
        if (node) {
          drag(drop(node));
        }
      }}
      className="w-140 mb-4 p-4 border border-gray-300 rounded"
    >
      <div className="flex items-center gap-3">
        <span className="font-semibold mr-2">{index + 1}.</span>
        <input
          type="text"
          value={question.text}
          onChange={(e) => onTextChange(index, e.target.value)}
          placeholder="Question"
          className="p-2 border border-gray-300 rounded mr-2"
        />

        <Select
          options={questionTypes}
          value={questionTypes.find((opt) => opt.value === question.type)}
          onChange={(selectedOption) =>
            onTypeChange(
              index,
              selectedOption?.value as
                | "text"
                | "single_choice"
                | "multiple_choices"
            )
          }
          className="w-56"
        />

        <button onClick={() => onRemove(index)} className="ml-2 text-red-500">
          <FaTrash />
        </button>
      </div>

      {question.type !== "text" && (
        <div>
          <h3 className="font-medium my-2">Answers</h3>
          {question.options?.map((answer, aIndex) => (
            <div key={aIndex} className="flex items-center mb-2">
              <input
                type="text"
                value={answer}
                onChange={(e) => onAnswerChange(index, aIndex, e.target.value)}
                placeholder="Choice"
                className="p-2 border border-gray-300 rounded mr-2"
              />
              <button
                onClick={() => onRemoveAnswer(index, aIndex)}
                className=" text-red-500"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <button onClick={() => onAddAnswer(index)} className="text-pink-500">
            Add Answer
          </button>
        </div>
      )}
    </div>
  );
}
