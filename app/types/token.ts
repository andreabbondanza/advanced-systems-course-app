
interface IToken
{
    idUser: number;
    updated: string;
    created: string;
    expired: string;
    userName: string;
    email: string;
    types: string;
    claims: string;
}
export default class Token implements IToken
{
    public idUser: number = 0;
    public updated: string = "";
    public created: string = "";
    public expired: string = "";
    public userName: string = "";
    public email: string = "";
    public types: string = "";
    public claims: string = "";
}

export enum RolesTypes
{
    A1 = "A1",
    U1 = "U1"
}

export { IToken as IToken };
