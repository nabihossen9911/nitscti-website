const path = require('node:path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
const workspaceRoot = path.resolve(__dirname, '../..');

// The canonical course catalog is shared with the website from packages/shared.
config.watchFolders = [workspaceRoot];
config.resolver.blockList = [
  /.*[\\/]\.git[\\/].*/,
  /^(?!.*[\\/]apps[\\/]student-android[\\/]node_modules)[^]*[\\/]node_modules[\\/].*/,
];

module.exports = config;
