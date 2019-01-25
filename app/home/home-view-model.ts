
import { EventData } from "tns-core-modules/data/observable";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Visibility } from 'tns-core-modules/ui/page/page';
import { RestClient, HttpError } from '~/types/restClient';
import { ViewModel } from '~/types/ViewModel';
import StandardResponse from '~/types/response';

export class HomeViewModel extends ViewModel
{
    constructor()
    {
        super();
        this.npc(["VisToken", "VisTokenInverse"]);
    }
    // properties
    private email: string = "andrea@dewstudio.eua";
    public get Email(): string
    {
        return this.email;
    }
    public set Email(value: string)
    {
        this.email = value;
        this.npc("Email");
    }
    private password: string = "andrea12";
    public get Password(): string
    {
        return this.password;
    }
    public set Password(value: string)
    {
        this.password = value;
        this.npc("Password");
    }
    private Remember: boolean;
    public get Value(): boolean
    {
        return this.Remember;
    }
    public set Value(value: boolean)
    {
        this.Remember = value;
        this.npc("Value");
    }
    public get IsTokenLoaded(): boolean
    {
        return this.tManager.isLoaded();
    }
    public get VisToken(): Visibility
    {
        return this.IsTokenLoaded ? "visible" : "collapse";
    }
    public get VisTokenInverse(): Visibility
    {
        return !this.IsTokenLoaded ? "visible" : "collapse";
    }
    // methods
    public async Login(args: EventData)
    {
        const client = new RestClient();
        try
        {
            const json = {
                email: this.Email,
                password: this.Password,
                remember: this.Remember
            };
            const req = await client.request(
                {
                    headers: client.headers,
                    url: "https://corso.dev.dewstudio.eu/api/login",
                    method: "POST",
                    content: JSON.stringify(json)
                }
            );
            const response = StandardResponse.jsonToStandardResponse<any>(req.content.toJSON());
            this.tManager.setToken(response.data.token);
            this.npc(["VisToken", "VisTokenInverse"]);
        } catch (err)
        {
            const error = err as HttpError;
            if (error !== null)
            {
                const response = StandardResponse.jsonToStandardResponse<any>(error.response.content.toJSON());
                await dialogs.alert(response.errorMessage);
            }
        }
    }
    public Logout()
    {
        this.tManager.unsetToken();
        this.npc(["VisToken", "VisTokenInverse"]);
    }
    public Recovery(args: EventData)
    {
        // todo
    }
}
