import { FormGroup } from '@angular/forms';

export function checkPassword(value: string, matchingValue: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[value];
        const matchingControl = formGroup.controls[matchingValue];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}
