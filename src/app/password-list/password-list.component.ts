import { PasswordManagerService } from './../password-manager.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AES, enc } from 'crypto-js';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent {
  siteId !: string;
  siteName !: string;
  siteURL !: string;
  siteImgURL !: string;

  passwordList !: Observable<Array<any>>

  email !: string;
  username !: string;
  password !: string;
  passwordId !: string;

  formState : string = 'Add New'

  isSuccess: boolean = false;
  successMessage !: string;


  constructor(
    private route: ActivatedRoute, 
    private passwordManagerService: PasswordManagerService
    ) {

    this.route.queryParams.subscribe((val:any) => {
      this.siteId = val.id;
      this.siteName = val.siteName;
      this.siteURL = val.siteURL;
      this.siteImgURL = val.siteImgURL;
      console.log(val);
    })

    this.loadPasswords();
  }

  showAlert(message: string) {
    this.isSuccess = true;
    this.successMessage = message;
  }

  resetForm () {
    this.email = '';
    this.username = '';
    this.password = '';
    this.formState = 'Add New';
    this.passwordId = '';


  }

  onSubmit (values: object) {
    if(this.formState == 'Add New') {
      console.log(values);
      this.passwordManagerService.addPassword(values, this.siteId)
      .then(() => {
        this.showAlert('Data Saved Successfully.')
        this.resetForm();
      })
      .catch (err => {
        console.log(err);
      }) 
    }
    else if (this.formState == 'Edit') {
      this.passwordManagerService.updatePassword(this.siteId, this.passwordId, values)
      .then(() => {
        this.showAlert('Data Updated Successfully')
        this.resetForm();
      })
      .catch(err => {
        console.log(err);
      })
    }
   
  }

  loadPasswords () {
    this.passwordList = this.passwordManagerService.loadPasswords(this.siteId)
  }

  editPassword(email: string, username: string, password: string, passwordId: string) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.passwordId = passwordId;

    this.formState = 'Edit'
  }

  deletePassword(passwordId: string) {
    this.passwordManagerService.deletePassword(this.siteId, passwordId)
    .then(() => {
      this.showAlert('Data Deleted Successfully');
    })
    .catch(err => {
      console.log(err);
    })

  }

}
