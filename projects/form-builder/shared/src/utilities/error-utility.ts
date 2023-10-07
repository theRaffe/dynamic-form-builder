import { FormControl } from '@angular/forms';
import { ValidationInput } from '@form-builder/models';
import { Observable, map, tap } from 'rxjs';

export function getErrorMessage(
    formControlInput: FormControl,
    validations: ValidationInput
): string[] {
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
        if (isCheckLength(key) && !!validations) {
            const valueMessage =
                key === 'max'
                    ? validations?.range?.max
                    : key === 'min'
                    ? validations?.range?.max
                    : key === 'maxlength'
                    ? validations.maxLength
                    : key === 'minlength'
                    ? validations.minLength
                    : '';
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

export function getErrorMessageInput$(formControlInput: FormControl, validations: any): Observable<string[]> {
    return formControlInput.statusChanges.pipe(
        map((status) => {
            if (status === 'INVALID') {
                const messages = getErrorMessage(
                    formControlInput,
                    validations
                );
                return messages;
            }

            return [];
        })
    );
}
