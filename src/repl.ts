import { app } from './app'
import * as services from './services'
import fs = require('fs')

const replServer = require('repl').start({})
const promisify = require('repl-promised').promisify

if (!fs.existsSync('.node_repl_history')){
  fs.closeSync(fs.openSync('.node_repl_history', 'w'))
}

fs.statSync('.node_repl_history')

// load command history from a file called .node_repl history in the current directory
fs.readFileSync('.node_repl_history')
  .toString()
  .split('\n')
  .reverse()
  .filter((line: string) => line.trim())
  .map((line: string) => replServer.history.push(line))

replServer.context.app = app
replServer.context.services = services

replServer.on('exit', () => {
  fs.appendFileSync('.node_repl_history', replServer.lines.join('\n'))
  process.exit();
});

promisify(replServer)
