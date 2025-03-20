import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchQuestions } from "./operations";
import { handlePending, handleRejected } from "../init";
import { IQuestion } from "../../interfaces/interfaces";

interface MedicineState {
  questions: IQuestion[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MedicineState = {
  questions: [],
  isLoading: false,
  error: null,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        handlePending(state);
      })
      .addCase(
        fetchQuestions.fulfilled,
        (state, action: PayloadAction<IQuestion[]>) => {
          state.isLoading = false;
          state.questions = action.payload;
        }
      )
      .addCase(fetchQuestions.rejected, (state, action) => {
        handleRejected(state, action);
      });
  },
});

export default questionsSlice.reducer;
