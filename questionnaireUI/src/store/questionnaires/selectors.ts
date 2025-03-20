import { RootState } from "../store";

export const selectQuestionnaires = (state: RootState) =>
  state.questionnaires.questionnaires;
export const selectItem = (state: RootState) => state.questionnaires.item;
