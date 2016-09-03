import {IHandlerBase} from "./handlerBase";
import {ICommand} from "./command";
import {IQuery} from "./query";

export interface IProcessor {
    command(command: ICommand): Promise<any>;
    query(query: IQuery): Promise<any>;
}

export class Processor implements IProcessor {
    private cqsRegistry: any;

    constructor() {
        this.cqsRegistry = {};
    }

    registerHandler(name: string, myHandler: IHandlerBase): void {
        var handler = this.cqsRegistry[name];
        if (handler) {
            throw new Error(`Handler ${name} already registered`);
        }

        this.cqsRegistry[name] = myHandler;
    }

    async command(command: ICommand): Promise<any> {
        var handler = this.cqsRegistry[command.constructor.name];
        if (!handler) {
            throw new Error(`Command ${command.constructor.name} not found`);
        }

        return await handler.prototype.handle(command);
    }

    async query(query: IQuery): Promise<any> {
        var handler = this.cqsRegistry[query.constructor.name];
        if (!handler) {
            throw new Error(`Query ${query.constructor.name} not found`);
        }

        return await handler.prototype.handle(query);
    }
}