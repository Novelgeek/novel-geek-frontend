export default class Post_modal {

    public postType: String;
    public postDescription: String;
    public postTitle: String;
    public imageURL: string;
    public postedDate: Date;
    public isShow: boolean;


    public likeCount: number;
    public commentCount: number;

    public commentList: any [];

    public constructor(){
        this.postType="TEXT";
        this.postDescription="";
        this.postTitle = "";
        this.imageURL = "";
        this.postedDate=new Date();
        this.isShow=false;

        this.likeCount=0;
        this.commentCount=0;

        this.commentList=[];
    }
}
