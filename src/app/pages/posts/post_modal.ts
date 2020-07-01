export default class Post_modal {
    public postid:number;
    public username:string;
    public title:string;
    public publishedDate: Date;
    public imagePath:string;
    public description:string;
    public sharedtype: string;
    public likecount:number;
    public commentcount:number;
    public owned: boolean;
    public liked: boolean;

    public constructor(){
        this.postid=0;
        this.username='';
        this.title="";
        this.publishedDate=new Date();
        this.imagePath="";
        this.description="";
        this.sharedtype="";
        this.likecount=0;
        this.commentcount=0;
        this.owned=true;
        this.liked=false;

    }
}
