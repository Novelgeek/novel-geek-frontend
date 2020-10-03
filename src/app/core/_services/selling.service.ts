import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Selling_modal from 'app/pages/sales/selling_modal';
import Payment_temp from 'app/pages/sales/payment_temp';
@Injectable({providedIn: 'root'})
export class SellingService {

    constructor(private http: HttpClient) {}

    createPost(newpost: FormData) {
        return this.http.post<Selling_modal>('/selling/newpost', newpost)
    }

    editPost(newpost: FormData) {
        return this.http.post<Selling_modal>('/selling/editpost', newpost)
    }

    soldBook(newpayment: Payment_temp){
        return this.http.post<any>('/selling/soldbook', newpayment)
    }

    getPurchaseData(sellingid: number){
        return this.http.get<any>('/selling/getpurchasedata/'+sellingid)
    }
    storeCustomer(data) {
        return this.http.post<any>('/selling/newcustomer', {
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
        return this.http.get<any>('/selling/allposts')
    }

    getMyPosts() {
        return this.http.get<any>('/selling/myposts')
    }


    deletePost(sellingid: number) {

        return this.http.delete<any>('/selling/delete/'+ sellingid)

    }


    getPost(sellingid: number) {
        return this.http.get<any>('/selling/getpost/' + sellingid)
    }
}
