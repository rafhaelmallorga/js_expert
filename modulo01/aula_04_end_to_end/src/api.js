const http = require("http");
const DEFAULT_USER = {
    username: 'rafhaelmallorga',
    password: '123'
}
const { once } = require('events')
const routes = {
    '/contact:get': (request, response) => {
        response.write('Contact us page')
        return  response.end()
    },
    '/login:post': async (request, response) => {
        const data = JSON.parse(await once(request, 'data'))
        console.log(data)
        const toLower = (text) => text.toLowerCase()
        if(
            toLower(data.username)  !== toLower(DEFAULT_USER.username) ||
            data.password !== DEFAULT_USER.password
        ) {
            response.writeHead(401);
            response.end('Log in failed!');
            return
        }

        return  response.end('Log in succeeded!')
    },
    default(request, response) {
        response.writeHead(404)
        return  response.end('Not found!')
    },
}

function handler(request, response) {
    const { url, method } = request;
    const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`
    const chosen = routes[routeKey] || routes.default;
    return chosen(request, response);
}

const app =  http.createServer(handler)
    .listen(3000, () => console.log("Running at 3000"))

module.exports = app;