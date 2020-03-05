import { Component, OnInit } from '@angular/core';
// Services
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';
import { SetsService } from '../services/sets.service';
import { Sets } from '../../models/sets.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  sets: Sets[];
  loading = true;

  constructor(
    private setsService: SetsService,
    private toastr: ValidatorMessageService
  ) { }

  ngOnInit() {
    this.fetchLists();
  }

  fetchLists() {
    this.loading = true;
    this.setsService.list()
      .then(successResponse => {
        this.loading = false;
        this.sets = successResponse.body.data;
    })
    .catch(errorResponse => {
      this.toastr.showMessage(errorResponse.error.message, 'error');
    });
  }

  removeSet(set: Sets) {
    if (confirm('Are you sure to delete ' + set.name + '\'s Set')) {
      this.setsService
        .removeSet(set.id)
        .then(successResponse => {
          this.toastr.showMessage('Set deleted Successfully');
          this.fetchLists();
        })
        .catch(errorResponse => {
          this.toastr.showMessage(errorResponse, 'error');
        });
    }
  }

}
