import { Response } from 'express'; // Import Response type from express
import * as ejs from 'ejs'; // Import EJS for type inference

// Assuming you're using EJS as the template engine
declare module 'express' {
    interface Response {
        render(view: string, locals?: Record<string, any>, callback?: (err: Error, html: string) => void): void;
    }
}

// Now you can use res.render without TypeScript errors


export interface IHttp {

}