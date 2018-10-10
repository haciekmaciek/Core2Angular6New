import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { IUser } from '../Model/user';

@Component({
    moduleId: module.id.toString(),
    selector: 'kendo-grid-edit-form',
    styles: [
        'input[type=text] { width: 100%; }'
    ],
    templateUrl: './edit-form.component.html'
})

export class GridEditFormComponent {
    public active = false;
    public genderItems: Array<string> = ["Male", "Female"];
    public defaultItem: { text: string, value: number } = { text: "Select item...", value: null };

    public editForm: FormGroup = new FormGroup({
        'Id': new FormControl(),
        'FirstName': new FormControl('', Validators.required),
        'LastName': new FormControl(0),
        'Gender': new FormControl('', Validators.required)
    });

    @Input() public isNew = false;
    @Input() public set model(user: IUser) {
        this.editForm.reset(user);

        this.active = user !== undefined;
    }

    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<IUser> = new EventEmitter();

    public onSave(e): void {
        e.preventDefault();
        this.save.emit(this.editForm.value);
        this.active = false;
    }

    public onCancel(e): void {
        e.preventDefault();
        this.closeForm();
    }

    private closeForm(): void {
        this.active = false;
        this.cancel.emit();
    }
}
