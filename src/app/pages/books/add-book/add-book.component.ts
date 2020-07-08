import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  imageUrl = '';
  selectedImage: File;
  selectedPdf: File;

  selectedGenres;
  searchTerms;
  urls;
  genres: any[] = [];
  genresNames = ['Action', 'Adventure', 'Comedy'];

  constructor(private bookService: BooksService) { }

  ngOnInit() {
    this.genresNames.forEach((c, i) => {
      this.genres.push({ id: i, name: c });
  });
  }

  public uploadImage(event) {
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // tslint:disable-next-line: no-shadowed-variable
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      }
      this.selectedPdf = event.target.files[0];
    }
  }


  public uploadPdf(event) {
    if (event.target.files) {
      this.selectedPdf = event.target.files[0];
    }
  }

  addTagFn(name) {
    return { name: name, tag: true };
  }

  addBook(basicBookForm: NgForm, advancedBookForm: NgForm, optionalBookForm: NgForm) {
    const newBook = new FormData();
    newBook.append('title', basicBookForm.value.title);
    newBook.append('description', basicBookForm.value.description);
    newBook.append('img', this.selectedImage);
    newBook.append('isbn', advancedBookForm.value.isbn);
    newBook.append('year', advancedBookForm.value.year);
    newBook.append('author', advancedBookForm.value.author);
    newBook.append('genres', this.selectedGenres);
    newBook.append('searchTerms', this.searchTerms);
    newBook.append('urls', this.urls);
    newBook.append('publisher', optionalBookForm.value.publisher);
    newBook.append('pdf', this.selectedPdf);
    //   for (var pair of newBook.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]);
    // }

    this.bookService.addNewBook(newBook).subscribe(data => {

    })
  }

}
