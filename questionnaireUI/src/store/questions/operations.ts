import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, instance } from "../init";
import { IQuestion } from "../../interfaces/interfaces";

export const fetchQuestions = createAsyncThunk<
  IQuestion[],
  { id: string },
  { rejectValue: string }
>("questions/fetchAll", async (id, ThunkAPI) => {
  try {
    const res = await instance.get(`/questions/${id}`);
    return res.data;
  } catch (e) {
    return ThunkAPI.rejectWithValue(
      handleError(e, "Failed to fetch questions")
    );
  }
});
