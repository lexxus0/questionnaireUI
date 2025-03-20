import QuestionnairesList from "../components/QuestionnairesList";
import { useAppSelector } from "../store/hooks";
import { selectQuestionnaires } from "../store/questionnaires/selectors";

export default function MainPage() {
  const questionnaires = useAppSelector(selectQuestionnaires);
  return (
    <div>
      {questionnaires ? (
        <QuestionnairesList />
      ) : (
        <p>You haven't added any yet</p>
      )}
    </div>
  );
}
