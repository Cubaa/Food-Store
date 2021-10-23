export interface IErrorTypes{
    field: string;
    message: string;
    code: string;
}
export interface IErrorKeys{
    name: string;
    category_id: string;
}
export interface IErr{
    errors: IErrorTypes[]
}