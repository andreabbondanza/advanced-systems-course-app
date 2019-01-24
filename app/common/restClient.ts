import { getJSON, HttpRequestOptions, HttpResponse, request } from 'tns-core-modules/http/http';

export class RestClient
{
    public headers: any = {
        "API-KEY": "HM3a3mtjCOFg7U3IgE8LyUmTMTYSCI20WN1ccnIRTdw="
    };
    public authHeaders(token: string): any
    {
        return {
            "API-KEY": "HM3a3mtjCOFg7U3IgE8LyUmTMTYSCI20WN1ccnIRTdw=",
            "Authorization": "Bearer ".format([token])
        };
    }
    public async request(options: HttpRequestOptions): Promise<HttpResponse>
    {
        return request(options);
    }
}
