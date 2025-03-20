import { IQuestion } from "../interfaces/interfaces";

interface QuestionProps {
  question: IQuestion;
  index: number;
  answers: { [key: string]: string | string[] };
  setAnswers: React.Dispatch<
    React.SetStateAction<{ [key: string]: string | string[] }>
  >;
}

export default function Question({
  question,
  index,
  answers,
  setAnswers,
}: QuestionProps) {
  const handleChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleCheckboxChange = (option: string) => {
    setAnswers((prev) => {
      const currentValues = (prev[index] as string[]) || [];
      return {
        ...prev,
        [index]: currentValues.includes(option)
          ? currentValues.filter((v) => v !== option)
          : [...currentValues, option],
      };
    });
  };

  const handleRadioChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  return (
    <div className="pb-4">
      <label className="block text-lg font-medium">{question.text}</label>

      {question.type === "text" && (
        <input
          type="text"
          value={answers[index] || ""}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      )}

      {question.type === "multiple_choices" && question.options && (
        <div className="flex flex-col gap-3 justify-center">
          {question.options.map((option: string, idx: number) => (
            <label key={idx} className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                checked={((answers[index] as string[]) || []).includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="form-checkbox h-4 w-4 text-blue-500"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}

      {question.type === "single_choice" && question.options && (
        <div className="flex flex-col gap-3 justify-center">
          {question.options.map((option: string, idx: number) => (
            <label key={idx} className="inline-flex items-center space-x-2">
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                checked={answers[index] === option}
                onChange={() => handleRadioChange(option)}
                className="form-radio h-4 w-4"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
