/// <reference path="../typings/index.d.ts" />
import {IQuery} from "../src/query";
import {IHandler} from "../src/handler";
import {ICommand} from "../src/command";
import {Processor} from "../src/processor";

export abstract class MyyBase {
    protected async longRun(query: string): Promise<any[]> {
        //connect to db
        let list = [{ "name": "Paperino" }, { "name": "Pippo" }];
        await this.waitForIt();
        return list;
    }

    private async waitForIt(): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

export class MyQuery implements IQuery {
    myProp: string;

    constructor(myProp: string) {
        this.myProp = myProp;
    }

    id: string;
}

export class MyQuery2 implements IQuery {
    myProp: string;

    constructor(myProp: string) {
        this.myProp = myProp;
    }

    id: string;
}

export class MyQuerydHandler extends MyyBase implements IHandler<MyQuery> {
    async handle(paramter: MyQuery): Promise<any[]> {
        let query = "my query " + paramter.myProp;

        return await this.longRun(query);
    }
}

export class MyCommand implements ICommand {
    myProp: string;

    constructor(myProp: string) {
        this.myProp = myProp;
    }

    id: string;
}

export class MyCommand2 implements ICommand {
    myProp: string;

    constructor(myProp: string) {
        this.myProp = myProp;
    }

    id: string;
}

export class MyCommandHandler extends MyyBase implements IHandler<MyCommand> {
    async handle(paramter: MyCommand): Promise<any[]> {
        let query = "my query " + paramter.myProp;

        return await this.longRun(query);
    }
}

describe("Processsor", () => {
    beforeEach(() => {
        this.classUnderTest = new Processor();

        this.classUnderTest.registerHandler(MyQuery.name, MyQuerydHandler);
        this.classUnderTest.registerHandler(MyCommand.name, MyCommandHandler);
    });

    it("GIVEN a duplicate Query WHEN I register THEN I will receive an exception", () => {
        // Arrange
        var foo = function () {
            this.classUnderTest.registerHandler(MyQuery.name, MyQuerydHandler);
        }.bind(this);

        // Act
        expect(foo).toThrow();
    });

    it("GIVEN a non registred Query WHEN I process THEN I will receive an exception", (done) => {
        // Arrange
        let myQueryParam = new MyQuery2("booom");

        // Act
        this.classUnderTest.query(myQueryParam)
            .catch((error: any) => {
                // Assert
                expect(error.message).toBe("Query MyQuery2 not found");
                done();
            });
    });

    it("GIVEN a correct Query WHEN I process THEN I will receive a list of 2 names", (done) => {
        // Arrange
        let myQueryParam = new MyQuery("yeah");

        // Act
        this.classUnderTest.query(myQueryParam)
            .then((results: string[]) => {
                // Assert
                expect(results.length).toBe(2);
                done();
            });
    });

    it("GIVEN a duplicate Command WHEN I register THEN I will receive an exception", () => {
        // Arrange
        var foo = function () {
            this.classUnderTest.registerHandler(MyCommand.name, MyCommandHandler);
        }.bind(this);

        // Act
        expect(foo).toThrow();
    });

    it("GIVEN a non registred Command WHEN I process THEN I will receive an exception", (done) => {
        // Arrange
        let myCommandParam = new MyCommand2("booom");

        // Act
        this.classUnderTest.command(myCommandParam)
            .catch((error: any) => {
                // Assert
                expect(error.message).toBe("Command MyCommand2 not found");
                done();
            });
    });

    it("GIVEN a correct Command WHEN I process THEN I will receive a list of 2 names", (done) => {
        // Arrange
        let myCommandParam = new MyCommand("yeah");

        // Act
        this.classUnderTest.command(myCommandParam)
            .then((results: string[]) => {
                // Assert
                expect(results.length).toBe(2);
                done();
            });
    });
});