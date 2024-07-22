import { Component,OnInit,Input,Output} from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})

export class ParentComponent  {

  msg :string = "how are you child";
  msg2 :string = "";

  getMessage($event:any){
    this.msg2 = $event
  }

}
