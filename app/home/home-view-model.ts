
import { EventData } from "tns-core-modules/data/observable";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Visibility } from 'tns-core-modules/ui/page/page';
import { RestClient } from '~/common/restClient';
import { ViewModel } from '~/common/ViewModel';

export class HomeViewModel extends ViewModel
{
    constructor()
    {
        super();
        this.npsc(["VisToken", "VisTokenInverse"]);
    }
    // properties
    private email: string = "andrea@dewstudio.eu";
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
                    headers: {
                        "API-KEY": "HM3a3mtjCOFg7U3IgE8LyUmTMTYSCI20WN1ccnIRTdw=",
                        "Content-Type": "application/json"
                    },
                    url: "https://corso.dev.dewstudio.eu/api/login",
                    method: "POST",
                    content: JSON.stringify(json)
                }
            );
            if (req.statusCode === 200)
            {
                this.tManager.setToken(req.content.toJSON().data.token);
                this.npsc(["VisToken", "VisTokenInverse"]);
            }
            else
            {
                await dialogs.alert(req.content.toJSON().errorMessage);
            }
        } catch (err)
        {
            console.log("b" + err);
        }
    }
    public Logout()
    {
        this.tManager.unsetToken();
        this.npsc(["VisToken", "VisTokenInverse"]);
    }
    public Recovery(args: EventData)
    {
        // todo
    }
}
