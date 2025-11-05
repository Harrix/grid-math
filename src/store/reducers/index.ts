import { combineReducers } from "redux";
import { controllReducer } from "./controllReducer";
import { templatesReducer } from "./templatesReducer";
import { settingsReducer } from "./settingsReducer";
import { cellValuesReducer } from "./cellValuesReducer";

export const rootReducer = combineReducers({
    controll: controllReducer,
    templates: templatesReducer,
    settings: settingsReducer,
    cellValues: cellValuesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
