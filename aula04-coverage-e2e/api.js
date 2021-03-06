const http = require('http')

const DEFAULT_USER = { username: 'flpgst', password: '123'}

const routes = {
    '/login:post': async (request, response) => {
        for await (const data of request) {
            const {username, password} = JSON.parse(data)
            if(
                username !== DEFAULT_USER.username ||
                password !== DEFAULT_USER.password
            ) {
                response.writeHead(401)
                response.write("Not Authorized")
                return response.end()
            }
            response.write("Logged in")
            return response.end()
        }
    },
    
    '/contact:get': (request, response) => {
        response.write('entre em contato')
        return response.end()
    },

    default: (request, response) => {
        response.write('Helloo')
        return response.end()
    }

}

const handler = function (request,response) {
    const {url, method} = request
    const routeKey = `${url}:${method.toLowerCase()}`
    const chosen = routes[routeKey] || routes.default
    response.writeHead(200, {
        'Content-Type': 'text/html'
    })
    return chosen(request, response)
}

const app = http.createServer(handler).listen(3000, () => console.log('app running at ', 3000))

module.exports = app