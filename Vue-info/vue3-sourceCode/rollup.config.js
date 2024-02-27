import path from "path"
const json = require("@rollup/plugin-json")
const nodeResolve = require("@rollup/plugin-node-resolve") 
const ts = require("rollup-plugin-typescript2")

const packagesDir = path.resolve(__dirname,'packages')
const packageDir = path.resolve(packagesDir,process.env.TARGET)

const resolve = (p)=>path.resolve(packageDir,p)

const pkg = require(resolve("package.json"))
const name = path.basename(packageDir)

const outputConfig = {
  "esm-bundler":{
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: "es"
  },
  "cjs":{
    file: resolve(`dist/${name}.cjs.js`),
    format: "cjs"
  },
  "global":{
    file: resolve(`dist/${name}.global.js`),
    format: "iife"
  },
}

const options = pkg.buildOptions
function createConfig(format,output){
  output.name = options.name
  output.sourcemap = true
  return {
    input: resolve("src/index.ts"),
    output,
    plugins:[
      json(),
      ts({
        tsconfig: path.resolve(__dirname,'tsconfig.json')
      }),
      nodeResolve()
    ]
  }

}
export default options.formats.map(format=>createConfig(format,outputConfig[format]))