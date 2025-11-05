import { Dispatch } from "redux";
import { CellValuesActionType, CellValuesActions } from "../../types/cellValuesTypes";

export const setCellValue = (key: string, value: string) => {
    return (dispatch: Dispatch<CellValuesActions>) => {
        dispatch({
            type: CellValuesActionType.SET_CELL_VALUE,
            payload: { key, value },
        });
    };
};

export const clearCellValues = () => {
    return (dispatch: Dispatch<CellValuesActions>) => {
        dispatch({ type: CellValuesActionType.CLEAR_CELL_VALUES });
    };
};

