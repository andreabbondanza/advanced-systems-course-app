import * as  base64 from "base-64";
import * as appSettings from "tns-core-modules/application-settings";
import * as utf8 from "utf8";
import Token, { RolesTypes } from './token';

export default class TokenManager
{
    private localKey: string = "carr_patan_ca_past";
    private token: string | null = null;
    public session: boolean = false;
    private setLocalToken(): void
    {
        appSettings.setString(this.localKey, this.getTokenString());
    }
    public getTokenHeader(): string[]
    {
        return ["Authorization", "Bearer " + this.getTokenString()];
    }

    public atob(toConvert: string): string
    {
        return utf8.decode(base64.decode(toConvert));
    }
    /**
     * Return token string
     */
    public getTokenJsonString(): string | null
    {
        let tokenized: string[] = [];
        if (this.token !== null)
            tokenized = this.getTokenString().split(".");
        if (tokenized.length > 0)
            return this.atob(tokenized[1]);
        return null;
    }
    /**
     * Return the Token as type
     */
    public getTokenObject(): Token | null
    {
        let tokenized: string[] = [];
        if (this.token !== null)
            tokenized = this.getTokenString().split(".");
        if (tokenized.length > 0)
            return Object.assign(new Token(), JSON.parse(decodeURIComponent(this.atob(tokenized[1]))));
        return null;
    }
    /**
     * Return token string
     */
    public getTokenString(): string
    {
        if (this.token !== null)
            return this.token;
        throw new ReferenceError("Token is missed, not loaded");
    }
    /**
     * Check if the owner of current token is an admin
     */
    public isAdmin(): boolean
    {
        const token = this.getTokenObject();
        if (token !== null)
        {
            for (const elem of token.types)
            {
                if (elem === RolesTypes.A1)
                    return true;
            }
        }
        return false;
    }
    /**
     * Check if an user has roles
     * @param role the role
     */
    public hasClaim(claim: string)
    {
        const token = this.getTokenObject();
        if (token !== null)
        {
            for (const elem of token.claims)
            {
                if (elem === claim)
                    return true;
            }
        }
        return false;
    }
    /**
     * Check if an user has roles
     * @param role the role
     */
    public hasRole(role: RolesTypes)
    {
        const token = this.getTokenObject();
        if (token !== null)
        {
            for (const elem of token.types)
            {
                if (elem === role)
                    return true;
            }
        }
        return false;
    }
    /**
     * Check if a valid token is loaded
     */
    public isLoaded(): boolean
    {
        if (this.token === null)
            return false;
        const tJson = this.getTokenJsonString();
        if (tJson !== null)
        {
            const json = JSON.parse(tJson);
            if (typeof json === "object")
            {
                return true;
            }
        }
        return false;
    }
    /**
     * Load the token from localstorage
     */
    public loadLocalToken(): boolean
    {
        let loaded: string | null = null;
        loaded = appSettings.getString(this.localKey, null);
        if (loaded !== null)
        {
            if (loaded.split(".").length === 3)
            {
                const json = JSON.parse(this.atob(loaded.split(".")[1]));
                if (typeof json === "object")
                {
                    this.token = loaded;
                    return true;
                }
                else
                {
                    throw new SyntaxError("Local token is invalid");
                }
            }
            else
            {
                throw new SyntaxError("Local token is invalid");
            }
        }
        return false;
    }
    /**
     * Set the token string
     * @param token token string
     */
    public setToken(token: string)
    {
        this.token = token;
        this.setLocalToken();
    }
    /**
     * Remove token from vuex and storage
     */
    public unsetToken()
    {
        this.token = null;
        appSettings.remove(this.localKey);
    }
}
