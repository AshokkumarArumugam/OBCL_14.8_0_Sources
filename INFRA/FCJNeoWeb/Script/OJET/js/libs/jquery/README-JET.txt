This distribution of jQuery-UI is customized by Oracle JET

## Source Files

Download built source from https://github.com/jquery/jquery-ui/releases/tag/<version>
and replace contents of jqueryui-amd-<version>.

Update all JS files:

* CJS require() statements to mirror all AMD requires (for Jest testing)
* core.js: 'jquery-patch.js' import changed to 'jquery-patch'
* create minifed version in <jqueryui-version>.min

The script `patch-jqueryui.js` can automate these tasks. Copy the new JQUI into
a folder and run `patch-jqueryui.js <folder>`. It will modify the files in the
source folder and write the minified content out to <folder>.min.

## Jest preset

Update @oracle/oraclejet-jest-preset/preset.js `jqueryui-amd` path to new folder
