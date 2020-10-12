export default class Payment_modal {
    public merchant_id : string
    public return_url : string
    public cancel_url : string
    public notify_url : string
    public order_id : string
    public currency : string
    public items : string
    public amount : string
    public first_name : string
    public last_name : string
    public email : string
    public phone : string
    public address : string
    public city : string
    public country : string


    public constructor(){
        this.merchant_id = ""
        this.return_url = ""
        this.cancel_url = ""
        this.notify_url = ""
        this.order_id  = ""
        this.currency = ""
        this.items = ""
        this.amount= ""
        this.first_name = ""
        this.last_name = ""
        this.email = ""
        this.phone = ""
        this.address = ""
        this.city = ""
        this.country = ""

    }
}