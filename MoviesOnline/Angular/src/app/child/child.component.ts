import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})


export class ChildComponent  {

  @Input() pmsg :string = " ";

  @Output() notify = new EventEmitter();

  sendToParent(){
    this.notify.emit("im fine thanks..")
  }

}
