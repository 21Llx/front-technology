
const execa = require("execa")
// const target = "reactivity"
const target = "runtime-dom"


async function build(target) {
  await execa('rollup', ['-cw','--bundleConfigAsCjs', '--environment', `TARGET:${target}`],
    { stdio: 'inherit' })
}

build(target)