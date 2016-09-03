import {IHandlerBase} from "./handlerBase";

export interface IHandler<T> extends IHandlerBase {
    handle(parameter: T): Promise<any>;
}