export default class FetchClient {
    static async get(url: string): Promise<Response> {
        const data = await fetch(url);

        return data.json();
    }
}