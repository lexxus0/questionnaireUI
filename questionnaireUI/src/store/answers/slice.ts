import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAnswer } from "../../interfaces/interfaces";

interface AnswersState {
  answers: IAnswer[];
  startTime: number | null;
  endTime: number | null;
}

const initialState: AnswersState = {
  answers: [],
  startTime: null,
  endTime: null,
};

const answersSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    startQuestionnaire: (state) => {
      state.startTime = Date.now();
      state.answers = [];
    },
    setAnswer: (state, action: PayloadAction<IAnswer>) => {
      const index = state.answers.findIndex(
        (a) => a.questionId === action.payload.questionId
      );
      if (index !== -1) {
        state.answers[index] = action.payload;
      } else {
        state.answers.push(action.payload);
      }
    },
    completeQuestionnaire: (state) => {
      state.endTime = Date.now();
    },
    resetQuestionnaire: () => initialState,
  },
});

export const {
  startQuestionnaire,
  setAnswer,
  completeQuestionnaire,
  resetQuestionnaire,
} = answersSlice.actions;
export default answersSlice.reducer;
