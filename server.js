import { createServer } from 'node:http'
import handler from './.output/server'

const server = createServer(handler)
server.listen(8080)