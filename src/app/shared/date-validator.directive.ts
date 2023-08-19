import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function currentDatetimeValidator(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
        if (control.value) {
            const now = new Date();
            const formValue = new Date(control.value);
            const isValid = formValue.toISOString() > now.toISOString();
            return isValid ? null : {error: 'date invalid'}; 
        } else {
            return null;
        }
    }
}