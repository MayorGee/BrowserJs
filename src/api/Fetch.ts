export default class Fetch {
    static async fetchGetRequest(url: string) {
        const data = await fetch(url);

        return data.json();
    }
}