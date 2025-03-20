export interface IState {
  isLoading: boolean;
  error: string | null;
}

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface IQuestionnaire {
  _id: string;
  name: string;
  description: string;
  questions: IQuestion[];
  completions: number;
}

export interface IQuestion {
  questionnaireId: string;
  text: string;
  options?: string[];
  type: "text" | "single_choice" | "multiple_choices";
}

export interface IAnswer {
  questionId: string;
  answer: string | string[];
}
