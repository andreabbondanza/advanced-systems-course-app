import { HttpRequestOptions, HttpResponse, request } from 'tns-core-modules/http/http';

export class HttpError extends TypeError
{
    public constructor(resp: HttpResponse)
    {
        super();
        this.response = resp;
    }
    public response: HttpResponse;
}

export class RestClient
{
    public headers: any = {
        "API-KEY": "HM3a3mtjCOFg7U3IgE8LyUmTMTYSCI20WN1ccnIRTdw=",
        "Content-Type": "application/json"
    };
    public authHeaders(token: string): any
    {
        return {
            "API-KEY": "HM3a3mtjCOFg7U3IgE8LyUmTMTYSCI20WN1ccnIRTdw=",
            "Authorization": "Bearer ".format([token]),
            "Content-Type": "application/json"
        };
    }
    /**
     * Execute an httprequest
     * @param options options
     * @throws HttpError
     */
    public async request(options: HttpRequestOptions): Promise<HttpResponse>
    {
        const resp = await request(options);
        if (resp.statusCode >= 200 && resp.statusCode < 300)
            return resp;
        else
            throw new HttpError(resp);
    }
}
