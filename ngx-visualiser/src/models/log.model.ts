export class LogModel{
    constructor(
       public id:number = null,
       public message:string = null,
       public additional:string = null,
       public level:string = null,
       public timestamp:string = null,
       public fileName:string = null,
       public lineNumber:string = null

    ){}
}
