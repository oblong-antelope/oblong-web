import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Profile } from '../../models/index';

@Component({
    moduleId: module.id,
    selector: 'sd-edit-profile-modal',
    styles: [],
    templateUrl: './edit-profile-modal.component.html'
})
export class EditProfileModalComponent {

    @Input('profile') profile: Profile = undefined;
    @Output('onEdit') onEdit: EventEmitter<any> = new EventEmitter();

    @ViewChild('editModal') editModal: ModalComponent;
    @ViewChild('editForm') editForm: any;

    backup : string = '';
    saved : boolean = false;
    /**
     * Outer open method.
     */
    open() {
        this.backup = JSON.stringify(this.profile);
        this.editModal.open();
    }

    close() {
        if(this.isDirty() && !this.saved) {
            this.profile = JSON.parse(this.backup);
            this.onEdit.emit({profile: this.profile, change:false});
        }
        this.onEdit.emit({profile: this.profile, change:true});
    }

    save() {
         this.onEdit.emit(this.profile);
         this.saved = true;
         this.editModal.close();
    }

    isDirty() {
        return !this.editForm.form.pristine;
    }
}
