import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Sponsor } from '../models/sponsor.model';
import { Router, ActivatedRoute } from '@angular/router';
import { SponsorService } from '../services/sponsor.service';
import { SponsorFormService } from '../services/sponsor-form.service';
import { ValidatorMessageService } from '../../shared/services/validator-message/validator-message.service';
import { AppRoutes } from 'src/app/constants/app-routes';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  @ViewChild("file", {static: false}) file: ElementRef;
  
  sponsorForm: FormGroup;
  sponsor: Sponsor = new Sponsor();
  buttonClicked: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sponsorService: SponsorService,
    private sponsorFormService: SponsorFormService,
    private toastr: ValidatorMessageService, 
  ) { }

  ngOnInit() {
    this.sponsorForm = this.sponsorFormService.createForm(this.sponsor);
  }

  create() {
    const formData = new FormData();
    formData.append('file', this.sponsorForm.get('file').value);
    formData.append('name', this.sponsorForm.get('name').value);
    formData.append('prize', this.sponsorForm.get('prize').value);

    this.buttonClicked = true;
    this.sponsorService
        .create(formData)
        .then( response => {
          console.log(response)
          this.toastr.showMessage('Sponsor Added Successfully');
          this.router.navigate([AppRoutes.sponsors]);
        })
        .catch( error => {
          console.log(error)
        })
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.sponsorForm.get('file').setValue(file);
      console.log(file)
    }
  }

}