import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FanFictionService } from 'app/core/_services/fan-fiction.service';
import { FormBuilder } from '@angular/forms';



//  class ImageSnippet{
//   constructor(public src:string, public file: File){}
// }

@Component({
  selector: 'app-fan-fiction',
  templateUrl: './fan-fiction.component.html',
  styleUrls: ['./fan-fiction.component.css']
})
export class FanFictionComponent implements OnInit {

// selectedFile: ImageSnippet;
private userId: number;
fanfictionForm;
imageName: String;
constructor(private fanFictionService: FanFictionService,
  public dialogRef: MatDialogRef<FanFictionComponent>,
  private formBuilder: FormBuilder
  
  ){
    this.fanfictionForm = this.formBuilder.group({
      imageName: '',
      title: '',
      description: ''


    });
  }

// processFile(imageInput: any){
//   const file: File = imageInput.files[0];
//     const reader = new FileReader();


// reader.addEventListener('load', (event: any) => {

//   this.selectedFile = new ImageSnippet(event.target.result, file);

//   this.fanFictionService.addFanFiction(this.selectedFile.file).subscribe(
//     (res) => {
    
//     },
//     (err) => {
    
//     })
// });


// reader.readAsDataURL(file);
// }
  

  ngOnInit(): void {
  }

  addFacFiction(data) {   
    data.imageName = this.imageName; 
    console.log(data);
  }

// image upload

public url: any = null;

onSelectFile(event) {
  this.imageName = null;
  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url
console.log(event.target.files[0].name);
this.imageName = event.target.files[0].name;
    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = event.target.result;
    }
  }
}
public delete() {
  this.url = null;
}

close() {
  console.log("dialog box cancel btn");
  this.dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}

}
