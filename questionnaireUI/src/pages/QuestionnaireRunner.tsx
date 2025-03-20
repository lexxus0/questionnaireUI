import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { selectItem } from "../store/questionnaires/selectors";
import {
  getQuestionnaire,
  updateQuestionnaire,
} from "../store/questionnaires/operations";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { IQuestion } from "../interfaces/interfaces";
import Question from "../components/Question";
import { formatTime } from "../helpers/formatTime";

export default function QuestionnaireRunner() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const item = useAppSelector(selectItem);
  const questions = item?.questions || [];

  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>(
    () => JSON.parse(localStorage.getItem(`answers-${id}`) || "{}")
  );
  const [startTime, setStartTime] = useState<number | null>(() =>
    JSON.parse(localStorage.getItem(`startTime-${id}`) || "null")
  );
  const [timeTaken, setTimeTaken] = useState<number | null>(null);
  const [completed, setCompleted] = useState(() =>
    JSON.parse(localStorage.getItem(`completed-${id}`) || "false")
  );

  useEffect(() => {
    return () => {
      setCompleted(false);
    };
  }, []);

  useEffect(() => {
    if (id) dispatch(getQuestionnaire({ id }));
  }, [id, dispatch]);

  useEffect(() => {
    if (!startTime) {
      const currentTime = Date.now();
      setStartTime(currentTime);
      localStorage.setItem(`startTime-${id}`, JSON.stringify(currentTime));
    }
  }, [id, startTime]);

  useEffect(() => {
    localStorage.setItem(`answers-${id}`, JSON.stringify(answers));
  }, [answers, id]);

  useEffect(() => {
    localStorage.setItem(`completed-${id}`, JSON.stringify(completed));
  }, [completed, id]);

  const handleSubmit = () => {
    const endTime = Date.now();
    const totalTime = (endTime - (startTime || endTime)) / 1000;

    setTimeTaken(totalTime);
    if (id)
      dispatch(updateQuestionnaire({ id, completions: item.completions + 1 }));
    setCompleted(true);

    localStorage.removeItem(`answers-${id}`);
    localStorage.removeItem(`startTime-${id}`);
    localStorage.removeItem(`completed-${id}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 border border-blue-500 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4">{item?.name}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-4"
      >
        {questions.map((question: IQuestion, index: number) => (
          <Question
            key={question.questionnaireId + "-" + index}
            question={question}
            index={index}
            answers={answers}
            setAnswers={setAnswers}
          />
        ))}
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-md cursor-pointer hover:bg-pink-600"
        >
          Submit
        </button>
      </form>

      {completed && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Your Responses:</h3>
          <p>Time Taken: {formatTime(timeTaken ?? 0)}</p>
          <div className="space-y-4 mt-4">
            {questions.map((question: IQuestion, index: number) => (
              <div key={index}>
                <div className="font-medium">{question.text}</div>
                <div>
                  {Array.isArray(answers[index])
                    ? (answers[index] as string[]).join(", ")
                    : answers[index]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
