import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextBoxComponent } from './text-box.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatTextareaAutosize} from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import  {MatCurrencyFormatModule} from 'mat-currency-format';



@NgModule({
  declarations: [TextBoxComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
    MatCurrencyFormatModule
  ],
  exports: [TextBoxComponent]
})
export class TextBoxModule { }
