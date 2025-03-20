import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchQuestionnaires,
  getQuestionnaire,
  removeQuestionnaire,
  updateQuestionnaire,
} from "./operations";
import { handlePending, handleRejected } from "../init";
import { IQuestionnaire } from "../../interfaces/interfaces";

interface QuestionnaireState {
  questionnaires: IQuestionnaire[];
  item: IQuestionnaire | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: QuestionnaireState = {
  questionnaires: [],
  item: null,
  isLoading: false,
  error: null,
};

const questionnairesSlice = createSlice({
  name: "questionnaires",
  initialState,
  reducers: {
    clearItem: (state) => {
      if (state.item) {
        state.item.questions = [];
      }
    },
    increaseCompletion: (state, action: PayloadAction<string>) => {
      const questionnaireIndex = state.questionnaires.findIndex(
        (q) => q._id === action.payload
      );

      if (questionnaireIndex !== -1) {
        const updatedQuestionnaire = {
          ...state.questionnaires[questionnaireIndex],
          completions: state.questionnaires[questionnaireIndex].completions + 1,
        };

        state.questionnaires[questionnaireIndex] = updatedQuestionnaire;
        console.log(updatedQuestionnaire.completions + " after");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionnaires.pending, (state) => {
        handlePending(state);
      })
      .addCase(
        fetchQuestionnaires.fulfilled,
        (state, action: PayloadAction<IQuestionnaire[]>) => {
          state.isLoading = false;
          state.questionnaires = action.payload;
        }
      )
      .addCase(fetchQuestionnaires.rejected, (state, action) => {
        handleRejected(state, action);
      })
      .addCase(updateQuestionnaire.pending, (state) => {
        handlePending(state);
      })
      .addCase(
        updateQuestionnaire.fulfilled,
        (state, action: PayloadAction<IQuestionnaire | null>) => {
          state.isLoading = false;
          state.questionnaires = action.payload ? [action.payload] : [];
        }
      )
      .addCase(updateQuestionnaire.rejected, (state, action) => {
        handleRejected(state, action);
      })
      .addCase(getQuestionnaire.pending, (state) => {
        handlePending(state);
      })
      .addCase(
        getQuestionnaire.fulfilled,
        (state, action: PayloadAction<IQuestionnaire | null>) => {
          state.isLoading = false;
          state.item = action.payload;
        }
      )
      .addCase(getQuestionnaire.rejected, (state, action) => {
        handleRejected(state, action);
      })
      .addCase(removeQuestionnaire.pending, (state) => {
        handlePending(state);
      })
      .addCase(removeQuestionnaire.fulfilled, (state, action) => {
        state.isLoading = false;
        state.questionnaires = state.questionnaires.filter(
          (q) => q._id !== action.payload
        );
      })
      .addCase(removeQuestionnaire.rejected, (state, action) => {
        handleRejected(state, action);
      });
  },
});

export const { clearItem, increaseCompletion } = questionnairesSlice.actions;
export default questionnairesSlice.reducer;
