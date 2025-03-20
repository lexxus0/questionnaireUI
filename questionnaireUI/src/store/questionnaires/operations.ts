import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, instance } from "../init";
import { IQuestion, IQuestionnaire } from "../../interfaces/interfaces";

export const fetchQuestionnaires = createAsyncThunk<
  IQuestionnaire[],
  { sortBy?: string },
  { rejectValue: string }
>("questionnaires/fetchAll", async ({ sortBy }, ThunkAPI) => {
  try {
    const res = await instance.get("/questionnaires", {
      params: { sortBy },
    });
    return res.data;
  } catch (e) {
    return ThunkAPI.rejectWithValue(
      handleError(e, "Failed to fetch questionnaires")
    );
  }
});

export const createQuestionnaire = createAsyncThunk<
  IQuestionnaire,
  { name: string; description: string; questions: IQuestion[] },
  { rejectValue: string }
>(
  "questionnaires/create",
  async ({ name, description, questions }, ThunkAPI) => {
    try {
      const res = await instance.post("/questionnaires", {
        name,
        description,
        questions,
      });
      return res.data;
    } catch (e) {
      return ThunkAPI.rejectWithValue(
        handleError(e, "Failed to create questionnaire")
      );
    }
  }
);

export const getQuestionnaire = createAsyncThunk<
  IQuestionnaire,
  { id: string },
  { rejectValue: string }
>("questionnaires/getById", async ({ id }, ThunkAPI) => {
  try {
    const res = await instance.get(`/questionnaires/${id}`);
    return res.data;
  } catch (e) {
    return ThunkAPI.rejectWithValue(
      handleError(e, "Failed to create questionnaire")
    );
  }
});

export const updateQuestionnaire = createAsyncThunk<
  IQuestionnaire,
  {
    id: string;
    name?: string;
    description?: string;
    completions?: number;
    questions?: IQuestion[];
  },
  { rejectValue: string }
>(
  "questionnaires/update",
  async ({ id, name, description, completions, questions }, ThunkAPI) => {
    try {
      const res = await instance.put(`/questionnaires/${id}`, {
        name,
        description,
        completions,
        questions,
      });
      return res.data;
    } catch (e) {
      return ThunkAPI.rejectWithValue(
        handleError(e, "Failed to update questionnaire")
      );
    }
  }
);

export const removeQuestionnaire = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("questionnaires/remove", async (id, ThunkAPI) => {
  try {
    await instance.delete(`/questionnaires/${id}`);
    return id;
  } catch (e) {
    return ThunkAPI.rejectWithValue(
      handleError(e, "Failed to delete questionnaire")
    );
  }
});
