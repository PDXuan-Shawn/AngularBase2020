import { Component, ElementRef, Input, OnInit, Self,NgZone, ViewChild } from '@angular/core';
import { FormControl} from '@angular/forms';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import { TextBoxType } from 'src/app/commons/enums/text-box-type.enum';


@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent implements OnInit {

  textBoxType = TextBoxType;
  @Input() label: string;
  @Input() control: FormControl;
  @Input() inputType: string;
  @Input() controlType = TextBoxType.TextInput;

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  constructor(private _ngZone: NgZone) {
  }

  ngOnInit() {
  }

  showErrors() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }

  
  triggerResize() {
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

}
