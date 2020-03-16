//
// utility to swap ZEIT Now configs
//   unable to scope deploys to dev (team) with git enabled
//
const fs = require('fs').promises
const path = require('path')

// team names (here, personal and team)
const teamNames = ['personal', 'team']
const now = path.join(process.cwd(), '.now')
const project = path.join(now, 'project.json')

const main = async () => {
  const currentFile = path.join(now, 'current')
  const current = await fs.readFile(currentFile, 'utf8')
  // verify the current team is in our teamNames array
  if (!teamNames.includes(current)) {
    throw new Error(
      `Current ZEIT Now team not found in predefined team names, consider reconfiguring\nCurrent: ${current}\nAvailable: ${teamNames.join(
        ', '
      )}`
    )
  } else {
    // begin swap of files
    const target = teamNames.find(t => t !== current)
    try {
      await fs.copyFile(path.join(now, `project.${target}.json`), project)
    } catch (e) {
      throw new Error(`There was an error copying the target file to current Now config - ${e}`)
    } finally {
      console.info(`Successfully swapped from ${current} to ${target}. Happy deploying!`)
      await fs.writeFile(currentFile, target, 'utf8')
    }
    // handle if current project.[current].json does not match existing project.json
    // copy project.[target].json to project.json
    // write out team to current
  }
}

main()
