export default class Report_post_modal{
    public postid: number;
    public username: string;
    public userimg:string;
    public title: string;
    public publishedDate: Date;
    public imagePath: string;
    public description: string;  
    public likecount: number;
    public commentcount: number;
   


    public constructor(){
        this.postid=0;
        this.username='';
        this.userimg='';
        this.title="";
        this.publishedDate=new Date();
        this.imagePath="";
        this.description="";
        this.likecount=0;
        this.commentcount=0;
    }
}