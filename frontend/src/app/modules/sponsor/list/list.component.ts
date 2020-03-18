import { Component, OnInit } from '@angular/core';
import { SponsorService } from '../services/sponsor.service';
import { Sponsor } from '../models/sponsor.model';
import { AppRoutes } from 'src/app/constants/app-routes';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit() {
    console.log('this is sponsor list')
    this.fetchSponsors();
  }

  fetchSponsors() {
    this.sponsorService.list()
        .then( response => {
          this.loading = false;
          console.log(response)
          this.sponsors = response.body.data;
        })
        .catch( error => {
          console.log(error)
        })
  }

  removeSponsor(sponsor: Sponsor) {
    this.sponsorService.delete(sponsor)
        .then( response => {
          console.log(response)
          this.router.navigate([AppRoutes.sponsors]);
        })
        .catch( error => {
          console.log(error)
        })
  }

}
