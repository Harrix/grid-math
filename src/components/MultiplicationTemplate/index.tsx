import React from "react";
import BasicCalculationTemplate from "../BasicCalculationTemplate";
import { TemplateType } from "../Template";
import { ITemplate } from "../../types/templatesTypes";

interface IMultiplicationTemplateProps extends TemplateType {
    template: ITemplate;
}

const MultiplicationTemplate = (props: IMultiplicationTemplateProps) => {
    const { template } = props;

    return (
        <div className="template">
            {template.basics.map((basic, i) => {
                const isMultiplicationResult = i === 1;
                const multiplicationProps = isMultiplicationResult ? {
                    operandsBasicId: template.basics[0].id,
                    operandsDigitsInRow: template.basics[0].digitsInRow,
                } : {};

                return (
                    <BasicCalculationTemplate
                        basic={basic}
                        key={basic.id}
                        basicIndex={i}
                        {...multiplicationProps}
                    />
                );
            })}
        </div>
    );
};

export default MultiplicationTemplate;
