
import { EventData, Observable } from "tns-core-modules/data/observable";
import { Button } from "tns-core-modules/ui/button";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { RestClient } from '~/common/restClient';
import Token from '~/common/token';
import TokenManager from '~/common/tokenManager';
import { ViewModel } from '~/common/ViewModel';

export class HomeViewModel extends ViewModel
{
    constructor()
    {
        super();
    }
    // properties
    public Email: string = "andrea@dewstudio.eu";
    public Password: string = "andrea12";
    public Remember: boolean = false;
    public tManager: TokenManager = new TokenManager();
    public get IsTokenLoaded(): string
    {
        if (this.tManager.isLoaded())
            return "Caricato";
        return "Non caricato";
    }
    public async Login(args: EventData)
    {
        const client = new RestClient();
        try
        {
            const tManager: TokenManager = new TokenManager();
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
                tManager.setToken(req.content.toJSON().data.token);
                console.log(tManager.loadLocalToken());
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
    public Recovery(args: EventData)
    {

    }
}
