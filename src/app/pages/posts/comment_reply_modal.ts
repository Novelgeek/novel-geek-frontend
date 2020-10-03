export class Comment_reply_modal{
    public replyid: number;
    public username: string;
    public imagePath: string;
    public comment: string;
    public owned: boolean;

    public constructor() {
        this.replyid = 0 ;
        this.username = '';
        this.imagePath = '';
        this.comment = '';
        this.owned=false;
    }
}