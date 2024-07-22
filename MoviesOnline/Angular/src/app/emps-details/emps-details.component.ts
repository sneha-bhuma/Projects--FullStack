import { Component,Input } from '@angular/core';
import {Emp} from '../Models/emp'

@Component({
  selector: 'app-emps-details',
  templateUrl: './emps-details.component.html',
  styleUrl: './emps-details.component.css'
})

export class EmpsDetailsComponent {

  @Input() edet :Emp | undefined;

}
