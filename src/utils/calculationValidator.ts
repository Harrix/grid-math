import { BasicOperationType } from "../components/BasicCalculationTemplate";

export interface CellIdentifier {
    templateId: string;
    basicId: string;
    rowIndex: number;
    cellIndex: number;
    rowType: "number" | "helper" | "result";
}

export const getCellKey = (identifier: CellIdentifier): string => {
    return `${identifier.templateId}-${identifier.basicId}-${identifier.rowIndex}-${identifier.cellIndex}-${identifier.rowType}`;
};

export const getNumberFromCells = (
    values: { [key: string]: string },
    templateId: string,
    basicId: string,
    rowIndex: number,
    digitsInRow: number,
): number => {
    let numberString = "";
    for (let i = 0; i < digitsInRow; i++) {
        const key = getCellKey({
            templateId,
            basicId,
            rowIndex,
            cellIndex: i,
            rowType: "number",
        });
        const digit = values[key] || "0";
        numberString += digit;
    }
    const result = parseInt(numberString, 10) || 0;
    console.log(`getNumberFromCells: row ${rowIndex}, string "${numberString}" = ${result}`);
    return result;
};

export const getResultFromCells = (
    values: { [key: string]: string },
    templateId: string,
    basicId: string,
    rowIndex: number,
    digitsInResult: number,
): number => {
    let numberString = "";
    for (let i = 0; i < digitsInResult; i++) {
        const key = getCellKey({
            templateId,
            basicId,
            rowIndex,
            cellIndex: i,
            rowType: "result",
        });
        const digit = values[key] || "0";
        numberString += digit;
    }
    const result = parseInt(numberString, 10) || 0;
    console.log(`getResultFromCells: row ${rowIndex}, string "${numberString}" = ${result}`);
    return result;
};

export const calculateCorrectResult = (
    values: { [key: string]: string },
    templateId: string,
    basicId: string,
    operation: BasicOperationType,
    digitsInRow: number,
    calculatedNumbersCount: number,
): number => {
    console.log(`calculateCorrectResult: operation ${operation}, digitsInRow ${digitsInRow}`);
    switch (operation) {
        case "addition": {
            let sum = 0;
            for (let i = 0; i < calculatedNumbersCount; i++) {
                sum += getNumberFromCells(values, templateId, basicId, i, digitsInRow);
            }
            console.log(`Addition result: ${sum}`);
            return sum;
        }
        case "subtraction": {
            const first = getNumberFromCells(values, templateId, basicId, 0, digitsInRow);
            let result = first;
            for (let i = 1; i < calculatedNumbersCount; i++) {
                result -= getNumberFromCells(values, templateId, basicId, i, digitsInRow);
            }
            console.log(`Subtraction result: ${result}`);
            return result;
        }
        case "multiplication": {
            let product = 1;
            for (let i = 0; i < calculatedNumbersCount; i++) {
                product *= getNumberFromCells(values, templateId, basicId, i, digitsInRow);
            }
            console.log(`Multiplication result: ${product}`);
            return product;
        }
        case "division-result":
        case "division-basic":
            // Деление сложнее, требует больше контекста
            return 0;
        default:
            return 0;
    }
};

export const isResultCorrect = (
    values: { [key: string]: string },
    templateId: string,
    basicId: string,
    operation: BasicOperationType,
    digitsInRow: number,
    digitsInResult: number,
    calculatedNumbersCount: number,
    resultRowIndex: number,
): boolean => {
    // Проверяем правильность заполнения:
    // - Можно оставлять пустыми ячейки слева (ведущие нули)
    // - Нельзя оставлять пустыми ячейки справа от первой заполненной

    let firstFilledIndex = -1;
    let hasEmptyAfterFilled = false;

    // Находим первую заполненную ячейку и проверяем, что после нее нет пустых
    for (let i = 0; i < digitsInResult; i++) {
        const key = getCellKey({
            templateId,
            basicId,
            rowIndex: resultRowIndex,
            cellIndex: i,
            rowType: "result",
        });
        const cellValue = values[key];
        const isFilled = cellValue && cellValue.trim() !== "";

        if (isFilled && firstFilledIndex === -1) {
            firstFilledIndex = i;
        }

        // Если уже нашли заполненную ячейку, и текущая пустая - это ошибка
        if (firstFilledIndex !== -1 && !isFilled) {
            hasEmptyAfterFilled = true;
            break;
        }
    }

    // Если нет ни одной заполненной ячейки или есть пустые после заполненных - некорректно
    if (firstFilledIndex === -1 || hasEmptyAfterFilled) {
        console.log('Result validation failed: no filled cells or empty cells after filled ones');
        return false;
    }

    const correctResult = calculateCorrectResult(
        values,
        templateId,
        basicId,
        operation,
        digitsInRow,
        calculatedNumbersCount,
    );

    const userResult = getResultFromCells(
        values,
        templateId,
        basicId,
        resultRowIndex,
        digitsInResult,
    );

    console.log(`Final check: correct=${correctResult}, user=${userResult}, match=${correctResult === userResult}`);
    return correctResult === userResult;
};

