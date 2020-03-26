import { Component, OnInit } from '@angular/core';
import { SponsorService } from '../services/sponsor.service';
import { Sponsor } from '../models/sponsor.model';
import { AppRoutes } from 'src/app/constants/app-routes';
import { Router } from '@angular/router';
// Services
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  sponsors: Sponsor[];
  loading: boolean = true;

  constructor(
    private sponsorService: SponsorService,
    private router: Router,
    private toastr: ValidatorMessageService,
  ) { }

  ngOnInit() {
    this.fetchSponsors();
  }

  fetchSponsors() {
    this.sponsorService.list()
      .then( response => {
        this.loading = false;
        this.sponsors = response.body.data;
      })
      .catch( errorResponse => {
        this.toastr.showMessage(errorResponse.error.message, 'error');
      });
  }

  removeSponsor(sponsor: Sponsor) {
    if (confirm('Are you sure to delete ' + sponsor.name + '\'s Sponsor')) {
      this.sponsorService.delete(sponsor)
        .then( response => {
          this.toastr.showMessage('Sponsor Deleted Successfully');
          this.fetchSponsors();
        })
        .catch( errorResponse => {
          this.toastr.showMessage(errorResponse.error.message, 'error');
        });
    }
  }

}
