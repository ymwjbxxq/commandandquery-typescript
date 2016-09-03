# CommandAndQuery

## Overview

CommandAndQuery applies the CQS principle by using separate Query and Command objects to retrieve and modify data, respectively.

## Command configuration

### Basic Usage

You must register your query and commands. Once you have done it you can inject the "processor" in your class and use the method "query" or "command" to execute it

Have a look at the test: 
https://bitbucket.org/DanBranch/commandandquery-typescript/src/f63e92a250188ad602cc18a0bfe0a403c95d61a0/spec/processor.spec.ts?at=master&fileviewer=file-view-default