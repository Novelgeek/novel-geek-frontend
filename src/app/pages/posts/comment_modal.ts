export class Comment_modal {
    public coomentid: number;
    public username: string;
    public imagePath: string;
    public comment: string;
    public owned: boolean;

    public constructor() {
        this.coomentid= 0;
        this.username = '';
        this.imagePath = '';
        this.comment = '';
        this.owned=false;

    }
}
