
export default class StandardResponse<T>{
    public data!: T;
    public errorMessage!: string;
    public error: StandardError = new StandardError();
    /**
     * Create an object of type T from json
     * @param json
     */
    public static jsonToStandardResponse<T>(json: any): StandardResponse<T>
    {
        const response = new StandardResponse<T>();
        return Object.assign(response, json) as StandardResponse<T>;
    }
}

class StandardError
{
    public desc: string = "";
    public number: number = 0;
}

export { StandardError as StandardError };
