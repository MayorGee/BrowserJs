import { Liquid } from 'liquidjs';

export default class LiquidClient {
    static engine: Liquid;

    static initLiquid() {
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