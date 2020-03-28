//
// utility to swap ZEIT Now configs
//   unable to scope deploys to dev (team) with git enabled
//
// todo: write setup utility
//    - spawn multiple now config setups, then rename based on submitted team
//
// /.now
//    |- now.swap.json
//    |- project.json
//    |- project.personal.json
//    |- project.team.json
//
// SWAP CONFIG
/*
    {
      "current": "personal",
      "teams": [
        "personal",
        "team"
      ]
    }
*/
//
const { existsSync, ..._fs } = require('fs')
const fs = _fs.promises
const path = require('path')

// team names (here, personal and team)
const teamNames = ['personal', 'team']
const now = path.join(process.cwd(), '.now')
const project = path.join(now, 'project.json')
const configPath = path.join(now, 'now.swap.json')

function Config(_config) {
  this.defaultConfigPath = _config || path.join(process.cwd(), '.now/now.swap.json')
  this.settings = null
  this.init = async (_path = now, _config = this.defaultConfigPath) => {
    const storage = {
      current: null,
      teams: [...teamNames],
    }
    if (!existsSync(_config)) {
      console.log('CREATING FILE')
      await fs.writeFile(_config, JSON.stringify(storage, null, 2), 'utf8')
      this.settings = storage
    } else {
      // eslint-disable-next-line global-require
      const read = require(_config)
      this.settings = read
    }
  }
  this.update = async updates => {
    // eslint-disable-next-line global-require
    const read = require(this.defaultConfigPath)
    this.settings = { ...read, ...updates }
    await fs.writeFile(this.defaultConfigPath, JSON.stringify(this.settings, null, 2), 'utf8')
    return this.settings
  }

  if (this instanceof Config) {
    this.init()
  } else {
    const Temp = new Config()
    if (!Temp.settings) {
      Temp.init()
    }
    return Temp
  }
}

const main = async input => {
  const action = input.length ? input[0] : 'default'
  const config = new Config()
  switch (action) {
    case 'current': {
      return console.log(`Currently using: ${config.settings.current}`)
    }
    case 'swap':
    case 'toggle':
    case 'default': {
      // verify the current team is in our teamNames array
      if (!config.settings.teams.includes(config.settings.current)) {
        throw new Error(
          `Current ZEIT Now team not found in predefined team names, consider reconfiguring\nCurrent: ${
            config.settings.current
          }\nAvailable: ${config.settings.teams.join(', ')}`
        )
      } else {
        // begin swap of files
        const target = config.settings.teams.find(t => t !== config.settings.current)
        try {
          await fs.copyFile(path.join(now, `project.${target}.json`), project)
        } catch (e) {
          throw new Error(`There was an error copying the target file to current Now config - ${e}`)
        } finally {
          console.info(`Now using: ${target}`)
          config.update({ current: target })
        }
        break
        // handle if current project.[current].json does not match existing project.json
        // copy project.[target].json to project.json
        // write out team to current
      }
    }
    default: {
      console.error(`Uknown option provided: ${action}`)
    }
  }
}

main(process.argv.slice(2))
