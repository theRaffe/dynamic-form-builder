import { FormControl } from '@angular/forms';

export function getErrorMessage(formControlInput: FormControl, validations: any): string[] {
    const errorMessageDict: { [index: string]: any } = {
        required: 'You must enter a value',
        max: 'Max value should be @value@',
        min: 'Min value should be @value@',
        email: 'This is not a valid email',
        minlength: 'Minimun num of characters should be @value@',
        maxlength: 'Maximum num of characters should be @value@',
    };

    const errorKeys = Object.getOwnPropertyNames(formControlInput.errors);
    const resultMessage = [];
    for (const key of errorKeys) {
        const message = errorMessageDict[key];
        if (isCheckLength(key)) {
            const valueMessage = key === 'max' ? validations.range.max :
                key === 'min' ? validations.range.max :
                key === 'maxlength' ? validations.maxLength :
                key === 'minlength' ? validations.minLength : '';
            resultMessage.push(message.replace('@value@', valueMessage));
        } else {
            resultMessage.push(message);
        }
    }

    return resultMessage;
}

function isCheckLength(keyValue: string) {
    const checkLengthList = ['max', 'min', 'minlength', 'maxlength'];
    return checkLengthList.some((value) => value === keyValue);
}
