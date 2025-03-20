import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchQuestionnaires } from "../store/questionnaires/operations";
import { selectQuestionnaires } from "../store/questionnaires/selectors";
import { IQuestionnaire } from "../interfaces/interfaces";
import QuestionnaireItem from "./QuestionnaireItem";
import Header from "./Header";
import Filter from "./Filter";

export default function QuestionnairesList() {
  const dispatch = useAppDispatch();

  const questionnaires = useAppSelector(selectQuestionnaires);

  return (
    <div className="border border-[rgba(0,58,159,0.64)]">
      <Header />
      <Filter />
      <ul className="flex px-5 py-10 flex-wrap gap-18.5">
        {questionnaires.map((questionnaire: IQuestionnaire) => (
          <QuestionnaireItem
            key={questionnaire._id}
            questionnaire={questionnaire}
          />
        ))}
      </ul>
    </div>
  );
}
