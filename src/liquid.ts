export default class Liquid {
    // @ts-ignore
    static engine;

    static initLiquid() {
        // @ts-ignore
        const Liquid = window.liquidjs.Liquid;

        this.engine = new Liquid({
            extname: '.html',
            cache: true
        });
    }

    static async renderTemplate(templatePath: string, accounts: Record<string, any>[]) {
        const template = `{% include "${templatePath}" %}`;

        return this.engine.parseAndRender(template, { accounts });
    }
}