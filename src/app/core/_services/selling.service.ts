import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Selling_modal from 'app/pages/sales/selling_modal';

@Injectable({providedIn: 'root'})
export class SellingService {

    constructor(private http: HttpClient) {}

    createPost(newpost: FormData) {
        return this.http.post<Selling_modal>('http://localhost:8080/selling/newpost', newpost)
    }

    storeCustomer(data) {
        return this.http.post<any>('http://localhost:8080/selling/newcustomer', {
            first_name:data.first_name,
            last_name:data.last_name,
            email:data.email,
            phone:data.phone,
            address:data.address,
            city:data.city,
            country:data.country
        })
    }

    getAllPosts() {
        return this.http.get<any>('http://localhost:8080/selling/allposts')
    }

    getMyPosts() {
        return this.http.get<any>('http://localhost:8080/selling/myposts')
    }


    deletePost(sellingid: number) {
        return this.http.delete('http://localhost:8080/selling/delete/'+ sellingid)

    }
}
