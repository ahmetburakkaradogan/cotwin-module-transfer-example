import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {MessageService, SortMeta} from 'primeng/api';
import { FormField } from '../models/FromField.class';
import { LabelInputHtmlClass } from '../models/LabelInputHtml.class';
import { PageResult } from '../models/PageResult.class';
import { SortDirection } from '../models/Pageable.class';

@Injectable({
    providedIn: 'root'
})
export class HelperService {
  constructor(private formBuilder: FormBuilder, private messageService: MessageService) {
  }
    public requiredClass: LabelInputHtmlClass = new LabelInputHtmlClass('field grid','required col-12 mb-2 md:col-4 md:mb-0');
    public requiredEditClass: LabelInputHtmlClass = new LabelInputHtmlClass('field col-12 md:col-12 p-fluid','required','');
    public editClass: LabelInputHtmlClass = new LabelInputHtmlClass('field col-12 md:col-12 p-fluid','','');

  public saveLocalstorage(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    public getLocalstorage(key: string) {
        return localStorage.getItem(key);
    }
    public groupByKey(array, key) {
        return array.reduce((hash, obj) => {
            if (obj[key] === undefined) {
                return hash;
            }
            return Object.assign(hash, {[obj[key]]: (hash[obj[key]] || []).concat(obj)});
        }, {});
    }

    public formatDate(date: Date, join: string = '-'): string {
      let month = '' + (date.getMonth() + 1);
      let day = '' + date.getDate();
      const year = date.getFullYear();

      if (month.length < 2) {
        month = '0' + month;
      }
      if (day.length < 2) {
        day = '0' + day;
      }
      return [year, month, day].join(join);
    }

    public getYearMonth(date: Date, join: string = '-'): string {
      let month = '' + (date.getMonth() + 1);
      const year = date.getFullYear();
      if (month.length < 2) {
        month = '0' + month;
      }
      return [year, month].join(join);
    }

    public removeUndefinedAndNull(obj) {
      const propNames = Object.getOwnPropertyNames(obj);
      for (let i = 0; i < propNames.length; i++) {
        const propName = propNames[i];
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
          delete obj[propName];
        } else if (obj[propName].length === 1 && obj[propName][0] === '') {
          delete obj[propName];
        }
      }
      return obj;
    }

    public atLeastOneValidator = () => {
      return (controlGroup) => {
        const controls = controlGroup.controls;
        if ( controls ) {
          const theOne = Object.keys(controls).find(key => controls[key].value !== null);
          if ( !theOne ) {
            return {
              atLeastOneRequired : {
                text : 'At least one should be selected'
              }
            };
          }
        }
        return null;
      };
    }

  public buildSimpleFormWithValidation(fields: FormField[]): FormGroup {
    const group = this.formBuilder.group({});
    for (const field of fields) {
      group.addControl(field.id, field.formControl);
    }
    return group;
  }
  public preparePageObjectForFrontend(data: any, type: string): PageResult {
    const temp = new PageResult();
    if (data._embedded) {
      temp.items = temp.items.concat(data._embedded[type]);
    } else if (data.content) {
      temp.items = temp.items.concat(data.content);
    }
    temp.page = data.page.number;
    temp.totalItems = data.page.totalElements;
    temp.totalPages = data.page.totalPages;
    return temp;
  }

  public showMessage(severity: string = 'success', summary: string, detail: string): void {
    this.messageService.add({
      key: 'tst',
      severity,
      summary,
      detail,
      life: 3000
    });
  }

  public getFormValues<T>(target: T, form: FormGroup): T {
    return Object.assign(target, form.value);
  }

  public getRequiredClass(form: FormGroup, field: string): LabelInputHtmlClass {
    return form.get(field).hasValidator(Validators.required) ? this.requiredClass : new LabelInputHtmlClass();
  }

  public getRequiredEditClass(form: FormGroup, field: string): LabelInputHtmlClass {
    return form.get(field).hasValidator(Validators.required) ? this.requiredEditClass : this.editClass;
  }

  public hasMinAndMaxValidator(form: FormGroup, field: string, validators: ValidatorFn[]): boolean {
      return validators.every(validator => form.get(field).hasValidator(validator) === true);
  }

    /*
    * Convert MultiSortMeta objects into string.
    * Field values are seperated by ',' each field seperated by '&'
    * Example:
    * [{field:id, order:1},{field:firstName, order: -1}]
    * ->
    * "id,asc&firstName,desc "
    * */
  public convertMultiSortMetaToString(multiSortMeta: SortMeta[]): string[]{
    return multiSortMeta ? multiSortMeta.map(sort => {
      let sortArr = Object.values(sort);
      // Change order to asc if 1, desc if not 1
      sortArr[1] = sortArr[1] == 1 ? SortDirection.asc : SortDirection.desc;
      return sortArr.join(',');
    }) : null;
  }
}
