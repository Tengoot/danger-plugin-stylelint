/**
 * Stylelint your code with Danger
 */
import stylelint from 'stylelint'

export default async function stylelint() {
  const filesToLint = danger.git.created_files.concat(danger.git.modified_files)
  return Promise.all(
    filesToLint.filter(f => /css$/.test(f)).map(f => lintFile(cli, config, f)),
  )
}

async function lintFile(path) {
  stylelint.lint({ files: path }).then(data => {
    if (data.errored === false) {
      return
    }

    data.results[0].warnings.map(result => {
      warn(result.text, path, result.line)
    })
  })
}
