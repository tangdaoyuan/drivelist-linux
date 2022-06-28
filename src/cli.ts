import yargs from 'yargs'
import Logger from './logger'
import { list } from '.'

// eslint-disable-next-line no-unused-expressions
yargs
  .scriptName('drivelist-linux')
  .usage('$0')
  .command(
    '$0',
    'Show driver list',
    () => {},
    async() => {
      try {
        const drivers = await list()
        Logger.info(drivers)
      }
      catch (error) {
        Logger.error(error)
      }
    })
  .example('$0', 'Show driver list')
  .showHelpOnFail(true)
  .alias('h', 'help')
  .alias('v', 'version')
  .help()
  .argv
