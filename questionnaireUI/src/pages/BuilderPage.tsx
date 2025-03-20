import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  getQuestionnaire,
  updateQuestionnaire,
} from "../store/questionnaires/operations";
import { IQuestion } from "../interfaces/interfaces";
import QuestionList from "../components/QuestionList";
import { selectItem } from "../store/questionnaires/selectors";
import { clearItem } from "../store/questionnaires/slice";

export default function QuestionnaireBuilder() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const item = useAppSelector(selectItem);
  const [questions, setQuestions] = useState<IQuestion[]>([
    { questionnaireId: id || "", text: "", type: "text", options: [""] },
    { questionnaireId: id || "", text: "", type: "text", options: [""] },
  ]);

  useEffect(() => {
    if (id) {
      dispatch(getQuestionnaire({ id }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (item?.questions && item.questions.length > 0) {
      setQuestions(item.questions);
    } else {
      setQuestions([
        { questionnaireId: id || "", text: "", type: "text", options: [""] },
        { questionnaireId: id || "", text: "", type: "text", options: [""] },
      ]);
    }
  }, [item, id]);

  const moveQuestion = (fromIndex: number, toIndex: number) => {
    const updatedQuestions = [...questions];
    const [movedQuestion] = updatedQuestions.splice(fromIndex, 1);
    updatedQuestions.splice(toIndex, 0, movedQuestion);
    setQuestions(updatedQuestions);
  };

  useEffect(() => {
    return () => {
      dispatch(clearItem());
    };
  }, [dispatch]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionnaireId: id || "", text: "", type: "text", options: [""] },
    ]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionTextChange = (index: number, text: string) => {
    setQuestions(questions.map((q, i) => (i === index ? { ...q, text } : q)));
  };

  const handleQuestionTypeChange = (
    index: number,
    type: "text" | "single_choice" | "multiple_choices"
  ) => {
    setQuestions(questions.map((q, i) => (i === index ? { ...q, type } : q)));
  };

  const addAnswer = (index: number) => {
    setQuestions(
      questions.map((q, i) =>
        i === index ? { ...q, options: [...(q.options || []), ""] } : q
      )
    );
  };

  const removeAnswer = (qIndex: number, aIndex: number) => {
    setQuestions(
      questions.map((q, i) =>
        i === qIndex
          ? {
              ...q,
              options: (q.options ?? []).filter((_, idx) => idx !== aIndex),
            }
          : q
      )
    );
  };

  const handleAnswerChange = (qIndex: number, aIndex: number, text: string) => {
    setQuestions(
      questions.map((q, i) =>
        i === qIndex
          ? {
              ...q,
              options: (q.options ?? []).map((opt, idx) =>
                idx === aIndex ? text : opt
              ),
            }
          : q
      )
    );
  };

  const handleSubmit = async () => {
    if (!id) return;
    console.log("Saving questions:", questions);
    await dispatch(updateQuestionnaire({ id, questions }));
    dispatch(getQuestionnaire({ id }));
    navigate("/");
  };

  return (
    <div>
      <h2 className="font-semibold text-2xl mb-5">Questionnaire Builder</h2>
      <DndProvider backend={HTML5Backend}>
        <QuestionList
          questions={questions}
          onAddQuestion={addQuestion}
          onTextChange={handleQuestionTextChange}
          onTypeChange={handleQuestionTypeChange}
          onRemoveQuestion={removeQuestion}
          onAnswerChange={handleAnswerChange}
          onAddAnswer={addAnswer}
          onRemoveAnswer={removeAnswer}
          moveQuestion={moveQuestion}
        />
      </DndProvider>
      <button
        onClick={handleSubmit}
        className="bg-pink-500 text-white p-2 rounded-[20px] cursor-pointer mt-4"
      >
        Save Changes
      </button>
    </div>
  );
}
