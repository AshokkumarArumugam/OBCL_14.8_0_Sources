#!/usr/bin/env node

/**
 * Patch jquery-ui for JET distribution
 *
 * 1. core.js: "./jquery-patch.js" -> "./jquery-patch"
 * 2. all files: add cjs imports for Jest testing
 */
const fs = require('fs-extra');
const path = require('path');
const vm = require('vm');
const [ node, bin, sourceDir ] = process.argv;
require('jsdom-global');
const R = require('ramda');
const jQuery = require('jquery');
const { minify } = require('terser');

function getDependencies(contents) {
  const scriptContext = vm.createContext({
    define: function (deps) {
      this.dependencies = deps || [];
    },
    jQuery,
    $: jQuery
  });
  scriptContext.define.amd = true;
  const script = new vm.Script(contents);
  script.runInContext(scriptContext);
  return global.dependencies;
}

async function patchFile(filepath) {
  if (!filepath.match(/\.js$/)) {
    return;
  }

  const contents = fs.readFileSync(filepath).toString();
  let patched = contents;
  if (filepath.match(/core\.js$/)) {
    const patchName = './jquery-patch.js'
    const patchAt = contents.indexOf(patchName);
    if (patchAt > 0) {
      patched = `${contents.substring(0, patchAt)}${patchName.replace(/\.js$/, '')}${contents.substring(patchAt + patchName.length)}`;
    }
  } else {
    const elseAt = contents.match(/\s+} else {/);
    if (contents.indexOf('module.exports =') === -1 && elseAt?.index > 0) {
      const deps = getDependencies(contents).filter(d => d !== 'jquery');
      patched = `${contents.substring(0, elseAt.index)}
  } else if (typeof module === 'object' && module.exports) {
${deps.map(d => `    require("${d}");`).join('\n')}
    module.exports = factory( require( "jquery" ) );${contents.substring(elseAt.index)}`;
    }
  }

  fs.writeFileSync(filepath, patched);
  const minFile = path.join(`${sourceDir}.min`, R.tail(filepath.split(path.sep)).join(path.sep));
  fs.mkdirpSync(path.dirname(minFile));
  const results = await minify(patched);
  fs.writeFileSync(minFile, results.code);
}

function lsR(dir) {
  if (fs.statSync(dir).isDirectory()) {
    return fs.readdirSync(dir).map(e => lsR(path.join(dir, e)));
  }
  return dir;
}

R.flatten(lsR(sourceDir)).map(patchFile)
