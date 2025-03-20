import { configureStore } from "@reduxjs/toolkit";
import questionnairesReducer from "./questionnaires/slice";
import questionReducer from "./questions/slice";
import answerReducer from "./answers/slice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const questionnairesPersistConfig = {
  key: "questionnaires",
  storage,
};
const questionsPersistConfig = {
  key: "questions",
  storage,
};
const answersPersistConfig = {
  key: "answers",
  storage,
};

export const store = configureStore({
  reducer: {
    questionnaires: persistReducer(
      questionnairesPersistConfig,
      questionnairesReducer
    ),
    questions: persistReducer(questionsPersistConfig, questionReducer),
    answers: persistReducer(answersPersistConfig, answerReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
