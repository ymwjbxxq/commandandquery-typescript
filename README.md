# CommandAndQuery

## Overview

CommandAndQuery applies the CQS principle by using separate Query and Command objects to retrieve and modify data, respectively.

## Command configuration

### Basic Usage

You must register your query and commands. Once Cancelyou have done it you can inject the "processor" in your class and use the method "query" or "command" to execute it

Have a look at the test: 
https://github.com/ymwjbxxq/commandandquery-typescript/blob/master/spec/processor.spec.ts
