import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
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

  constructor(
    private bookService: BooksService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) {}

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
      };
      this.selectedImage = event.target.files[0];
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

  addBook(
    basicBookForm: NgForm,
    advancedBookForm: NgForm,
    optionalBookForm: NgForm
  ) {
    const bookGenres: String[] = [];
    this.selectedGenres.forEach((genre) => {
      bookGenres.push(genre.name);
    });
    console.log(bookGenres);

    const newBook = new FormData();
    newBook.append('title', basicBookForm.value.title);
    newBook.append('description', basicBookForm.value.description);
    newBook.append('img', this.selectedImage);
    newBook.append('isbn', advancedBookForm.value.isbn);
    newBook.append('year', advancedBookForm.value.year);
    newBook.append('author', advancedBookForm.value.author);
    newBook.append('genres', this.selectedGenres);
    newBook.append('publisher', optionalBookForm.value.publisher);
    newBook.append('pdf', this.selectedPdf);
    this.spinner.show();
    this.bookService.addNewBook(newBook).subscribe(
      (data) => {
        this.spinner.hide();
        this.toastr.success('Book added Succesfully');
        this.router.navigate(['/books'])
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error('Unable to add book');
      }
    );
  }
}
