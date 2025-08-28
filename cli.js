#!/usr/bin/env node

const path = require('path');
const sortAndRenameFiles = require('./index'); // Import our main function

// process.argv contains the command-line arguments.
// The first two are 'node' and the path to our script, so we slice them off.
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('❌ Error: Please provide a directory path.');
  console.log('Usage: file-sorter <directory> [--force] [--skip .ext1,.ext2]');
  process.exit(1); // Exit with an error code
}

// The first argument is the directory
const targetDir = path.resolve(args[0]); // Use path.resolve to get an absolute path

// Parse options from the remaining arguments
const options = {
  force: args.includes('--force'),
  skipExtensions: []
};

const skipIndex = args.indexOf('--skip');
if (skipIndex !== -1 && args[skipIndex + 1]) {
  options.skipExtensions = args[skipIndex + 1].split(',').map(ext => ext.trim());
}

console.log(`🚀 Starting to process files in: ${targetDir}`);
// Run the main function with the directory and parsed options
sortAndRenameFiles(targetDir, options);