import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member.model';
import { AuthenticateService } from 'src/app/login/services/authenticate.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { RegisterService } from 'src/app/login/register.service';
import { SnackBarComponent } from 'src/app/friends/friend/friend.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty && control.touched);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  member: Member;
  matcher = new MyErrorStateMatcher();
  snackbarRef: SnackBarComponent;
  
  constructor(private _snackBar: MatSnackBar, private _registerService: RegisterService, private _authenticateService: AuthenticateService, private _router: Router, private fb: FormBuilder) {
    this._authenticateService.isLoggedin.subscribe(e => {
      if (localStorage.getItem('member') != null) {
        this.member = JSON.parse(localStorage.getItem('member'));
      }
    });
  }

  editAccountForm = this.fb.group({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    password: new FormControl('', Validators.compose([
      Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")
    ])
    ),
    confirmPassword: new FormControl('')
  }, { validator: this.checkPasswords });

  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true }
  }
  
  onSubmit(){
    this._registerService.getWhereID(this.member.memberID).subscribe(res => {
      var memberForPass = res;
      var memberToUpdate : Member;
      if (this.editAccountForm.get("password").value != '') {
        memberToUpdate = new Member(this.member.memberID, this.editAccountForm.get("username").value, this.editAccountForm.get("password").value, this.editAccountForm.get("email").value, '', true);
      } else{
        memberToUpdate = new Member(this.member.memberID, this.editAccountForm.get("username").value, memberForPass.password, this.editAccountForm.get("email").value, '', true);
      }
      this._registerService.updateMember(this.member.memberID, memberToUpdate).subscribe(() => {
        this._registerService.getWhereID(this.member.memberID).subscribe(() => {
          this.snackbarRef = this._snackBar.open("Your credentials have been updated!", '', {
            duration: 3000
          });
          this.ngOnInit();
        })
      });
    });
  }

  ngOnInit() {
    this.editAccountForm.get("username").setValue(this.member.username);
    this.editAccountForm.get("email").setValue(this.member.email);
  }
}
