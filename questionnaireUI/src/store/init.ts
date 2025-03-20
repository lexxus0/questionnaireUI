import { IState } from "../interfaces/interfaces";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const instance = axios.create({
  baseURL: "https://questionnaireapi.onrender.com",
});

export const handleError = (error: unknown, defaultMessage: string) => {
  return error instanceof Error ? error.message : defaultMessage;
};

export const handlePending = (state: IState) => {
  state.isLoading = true;
};

export const handleRejected = (
  state: IState,
  action: PayloadAction<string | undefined>
): void => {
  state.isLoading = false;
  state.error = action.payload || "An unknown error occurred";
};
