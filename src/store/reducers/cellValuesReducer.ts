import { CellValuesActionType, CellValuesActions, ICellValuesState } from "../../types/cellValuesTypes";

const initialState: ICellValuesState = {
    values: {},
};

export const cellValuesReducer = (
    state: ICellValuesState = initialState,
    action: CellValuesActions,
): ICellValuesState => {
    switch (action.type) {
        case CellValuesActionType.SET_CELL_VALUE:
            return {
                ...state,
                values: {
                    ...state.values,
                    [action.payload.key]: action.payload.value,
                },
            };
        case CellValuesActionType.CLEAR_CELL_VALUES:
            return initialState;
        default:
            return state;
    }
};

