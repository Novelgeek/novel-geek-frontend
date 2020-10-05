export default class Selling_modal {
    public sellingid: number;
    public username: string;
    public title: string;
    public publishedDate: Date;
    public imagePath: string;
    public description: string;
    public merchantid: string;
    public telephone: string;
    public price: number;
    public owned: boolean;
    public sold: boolean;


    public constructor(){
        this.sellingid=0;
        this.username='';
        this.title="";
        this.publishedDate=new Date();
        this.imagePath="";
        this.description="";
        this.merchantid="";
        this.telephone="";
        this.price=0;
        this.owned=true;
        this.sold=false;

    }
}