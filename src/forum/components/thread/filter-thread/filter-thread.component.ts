import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { FormField } from "src/forum/models/FromField.class";

@Component({
  selector: 'app-filter-thread',
  templateUrl: './filter-thread.component.html'
})
export class FilterThreadComponent implements OnInit {


  public filterForm: FormGroup;

  public readonly threadName: string = 'threadName';
  public readonly createdBy: string = 'createdBy';
  public readonly minVotes: string = 'minVotes';
  public readonly maxVotes: string = 'maxVotes';
  public readonly minComments: string = 'minComments';
  public readonly maxComments: string = 'maxComments';

  @Output() filterOutput = new EventEmitter();

  constructor(private formBuilder: FormBuilder,public translateService: TranslateService,) { }

  ngOnInit(): void {
    this.filterForm = this.buildForm();
  }

  resetFilters() {
    this.filterForm.reset();
    this.filterOutput.emit({});
  }

   public buildForm(): FormGroup  {
    return this.buildSimpleFormWithValidation([
      new FormField(this.threadName, this.formBuilder.control(null)),
      new FormField(this.createdBy, this.formBuilder.control(null)),
      new FormField(this.minVotes, this.formBuilder.control(null, Validators.pattern("^[0-9]*$"))),
      new FormField(this.maxVotes, this.formBuilder.control(null, Validators.pattern("^[0-9]*$"))),
      new FormField(this.minComments, this.formBuilder.control(null, Validators.pattern("^[0-9]*$"))),
      new FormField(this.maxComments, this.formBuilder.control(null, Validators.pattern("^[0-9]*$"))),
      ]
    );
  }

  private buildSimpleFormWithValidation(fields: FormField[]): FormGroup {
    const group = this.formBuilder.group({});
    for (const field of fields) {
      group.addControl(field.id, field.formControl);
    }
    return group;
  }

  public onSubmit() {
    let filter = this.filterForm.value;
    this.filterOutput.emit(filter);
  }

}
