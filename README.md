Gulp config
=============
2020-03-25 -> 2020-03-26


The goal of this repository is to hold the gulp configs I'll be using.

- Babel and bundle



Babel and bundle
=========
2020-03-25

With this config, it bundles all js files and babel them (also uglifies them and create the source maps), and also minifies the css/scss (and create the source maps too).

All the files can be found in the directory "babel-and-bundle" in this repository.

To use, npm install the package.json.
Optionally use **gulp watch** to browser sync. use the **gulp** command to apply the default gulp pipeline.




History Log
===========
- 2020-03-26
  - update "babel and bundle" > package.json to allow babel async
- 2020-03-26
  - add browser-sync-client.js script
- 2020-03-25
  - initial commit
