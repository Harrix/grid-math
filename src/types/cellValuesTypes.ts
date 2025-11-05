export interface ICellValuesState {
    values: { [key: string]: string };
}

export interface SetCellValueAction {
    type: CellValuesActionType.SET_CELL_VALUE;
    payload: {
        key: string;
        value: string;
    };
}

export interface ClearCellValuesAction {
    type: CellValuesActionType.CLEAR_CELL_VALUES;
}

export type CellValuesActions = SetCellValueAction | ClearCellValuesAction;

export enum CellValuesActionType {
    SET_CELL_VALUE = "SET_CELL_VALUE",
    CLEAR_CELL_VALUES = "CLEAR_CELL_VALUES",
}

