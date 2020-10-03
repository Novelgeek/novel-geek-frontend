export default class Purchase_info_modal {
    public paid_date : Date;
    public payment_id : string;
    public buyer_name: string;
    public imagePath: string;
    public email: string;
    public order_id: number;

    public constructor(){
        this.paid_date = new Date();
        this.payment_id = "";
        this.buyer_name = "";
        this.imagePath = "";
        this.email = "";
        this.order_id = 0;
    }
}