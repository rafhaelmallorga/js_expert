const { createSandbox } = require("sinon");
const sinon = createSandbox();
const Fibonacci = require("./fibonacci")
const assert = require("assert")

const fibonacci = new Fibonacci();

;(async () => {

    {   
        const spy = sinon.spy(
            fibonacci,
            fibonacci.execute.name
        )
        for (const sequencia of fibonacci.execute(5)) {}
        const expectedCallCount = 6;
        assert.strictEqual(spy.callCount, expectedCallCount)
    }
    
})()