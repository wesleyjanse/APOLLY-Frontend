import { Component, OnInit, Input } from '@angular/core';
import { Member } from 'src/app/models/member.model';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { RegisterService } from '../register.service';
import { Router, ActivatedRoute } from '@angular/router';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty && control.touched);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private _registerService: RegisterService, private _router: Router, private route: ActivatedRoute) { }

  newUser: boolean = true;
  submitted: boolean = false;
  memberToAdd: Member;
  model: Member = new Member(0, '', '', '', '', true);
  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.registerForm.get("email").setValue(params.get("email"))
      if (params.get("email") != null) {
        this.newUser = false;
      }
    });
  }

  registerForm = this.fb.group({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    password: new FormControl('', Validators.compose([
      Validators.required,
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

  onSubmit() {
    this.submitted = true;
    if (this.newUser) {
      this.memberToAdd = new Member(0, this.registerForm.get('username').value, this.registerForm.get('password').value, this.registerForm.get('email').value, '', true);
      this._registerService.addMember(this.memberToAdd).subscribe(() => {
        this._router.navigate(['Login']);
      });
    } else {
      this._registerService.getWhereEmail(this.registerForm.get('email').value).subscribe((res) => {
        this.memberToAdd = new Member(res.memberID, this.registerForm.get('username').value, this.registerForm.get('password').value, this.registerForm.get('email').value, '', true);
        this._registerService.updateMember(res.memberID,this.memberToAdd).subscribe(() => {
          this._router.navigate(['Login']);
        });
      });
    }
  }
}
