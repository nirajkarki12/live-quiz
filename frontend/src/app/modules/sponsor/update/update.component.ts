import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutes } from 'src/app/constants/app-routes';
import { Subscription } from 'rxjs';
// Services
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';
import { SponsorFormService } from '../services/sponsor-form.service';
import { SponsorService } from '../services/sponsor.service';
// Models
import { Sponsor } from 'src/app/modules/sponsor/models/sponsor.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  sponsorForm: FormGroup;
  sponsor: Sponsor = new Sponsor();
  buttonClicked = false;
  sub: Subscription;
  @ViewChild("file", {static: false}) file: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sponsorService: SponsorService,
    private sponsorFormService: SponsorFormService,
    private toastr: ValidatorMessageService
  ) { }

  ngOnInit() {
    this.route.data
    .subscribe((data) => {
      this.sponsor = data.sponsor.data;
      this.sponsorForm = this.sponsorFormService.createForm(this.sponsor);
    });
  }

   update() {
    this.buttonClicked = true;
    const formData = new FormData();
    if(this.sponsorForm.get('file').value) {
      formData.append('file', this.sponsorForm.get('file').value);
    }
    formData.append('name', this.sponsorForm.get('name').value);

    this.sponsorService
      .update(formData, this.sponsorForm.get('id').value)
      .then(response => {
        this.toastr.showMessage('Sponsor updated Successfully');
        this.router.navigate([AppRoutes.sponsors]);
      })
      .catch(errorResponse => {
        this.buttonClicked = false;
        this.toastr.showMessage(errorResponse.error.message, 'error');
      });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.sponsorForm.get('file').setValue(file);
    }
  }

}
