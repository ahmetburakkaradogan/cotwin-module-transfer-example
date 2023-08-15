import { Injectable } from '@angular/core';
import {MessageService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CustomMessageService {

  constructor(private messageService: MessageService, private translateService: TranslateService) { }

  success(detail?: string, summary?: string){
    this.messageService.add({
      severity: 'success',
      summary: summary ? summary : this.translateService.instant('general.successful'),
      detail: detail ? detail : this.translateService.instant('general.successful'),
      key: 'tb'
    })
  }

  error(error?:any, detail?: string, summary?: string, key?: string){
    this.messageService.add({
      severity: 'error',
      summary: summary ? summary : this.translateService.instant('general.error'),
      detail: error ? error.error.messages[0] : (detail ? detail : this.translateService.instant('general.error')),
      key: key ? key : 'tb'
    })
  }

  info(detail?: string, summary?: string){
    this.messageService.add({
      severity: 'info',
      summary: summary ? summary : this.translateService.instant('general.info'),
      detail: detail ? detail : this.translateService.instant('general.info'),
      key: 'tb'
    })
  }

  clear(){
    this.messageService.clear();
  }
}
