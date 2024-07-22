import { Component, inject } from '@angular/core';
import { CalculatorService } from '../calculator.service';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.css'
})
  
export class HelloComponent {

  constructor(private calc: CalculatorService){

  }
  
  // calc2 = inject(CalculatorService)

  company:string = "Google";
  weekDay = "Mon";
  classname : string = "text-danger";
  name :string  = 'Vj';
  message: string  = 'here1';
  message1: String  = 'here2';
  salary : number = 1110;
  fname = ['x1','x2','x3'];
  isDisabled = false;

  onclick(){
    this.message1 = 'button clicked'
  }

  getIncrement(){
    return this.calc.add(this.salary,100)
  }

}