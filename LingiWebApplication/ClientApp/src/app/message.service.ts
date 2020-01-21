import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toastrService: ToastrService) { }

  success(msg: string)
  {
    this.toastrService.success(msg);
  }

  error(msg: string)
  {
    this.toastrService.error(msg);
  }
}
