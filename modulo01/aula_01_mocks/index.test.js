const { error } = require("./src/constants");
const File = require("./src/file");
const assert = require("assert");

;(async () => {

    // variaveis criadas nesse bloco, so sao validas durante sua execucao
    {
        const filePath = './mock/emptyFile-invalid.csv';
        const expected = new Error(error.FILE_LENGHT_ERROR_MESSAGE);
        const result = File.csvToJSON(filePath);
        await assert.rejects(result, expected);
    }

    {
        const filePath = './mock/invalid-header.csv';
        const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
        const result = File.csvToJSON(filePath);
        await assert.rejects(result, expected);
    }

    {
        const filePath = './mock/fiveItems-invalid.csv';
        const expected = new Error(error.FILE_LENGHT_ERROR_MESSAGE);
        const result = File.csvToJSON(filePath);
        await assert.rejects(result, expected);
    }

    {
        const filePath = './mock/threeItems-valid.csv';
        const expected = [
            {
                id: 1,
                name: 'Xuxa da Silva',
                profession: 'Apresentadora',
                age: 45
            },
            {
                id: 2,
                name: 'Rafhael Mallorga',
                profession: 'Desenvolvedor',
                age: 29
            },
            {
                id: 3,
                name: 'Yoda',
                profession: 'Desempregado',
                age: 2
            },
        ]
        const result = await File.csvToJSON(filePath);
        await assert.deepEqual(result, expected);
    }
})()