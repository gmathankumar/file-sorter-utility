const fs = require('fs').promises;
const path = require('path');

/**
 * Strips a leading number prefix (e.g., "1_", "02_") from a filename.
 * @param {string} filename - The name of the file.
 * @returns {string} The filename without the prefix.
 */
function stripNumberPrefix(filename) {
  // This regular expression looks for one or more digits at the start of the string,
  // followed by an underscore.
  const regex = /^\d+_/g;
  return filename.replace(regex, '');
}

/**
 * Sorts and renames files in a directory by adding a numeric prefix.
 * @param {string} directory - The absolute path to the target directory.
 * @param {object} [options={}] - Configuration options.
 * @param {boolean} [options.force=false] - If true, re-numbers files that already have a prefix.
 * @param {string[]} [options.skipExtensions=[]] - An array of file extensions to ignore (e.g., ['.log', '.tmp']).
 */
// index.js

async function sortAndRenameFiles(directory, options = {}) {
  const { force = false, skipExtensions = [] } = options;

  try {
    const entries = await fs.readdir(directory);
    const hasPrefixRegex = /^\d+_\.*/;

    //Find the highest existing prefix ---
    let highestPrefix = 0;
    // Only scan for existing prefixes if we're NOT in force mode.
    if (!force) {
      for (const entry of entries) {
        if (hasPrefixRegex.test(entry)) {
          const prefixNum = parseInt(entry.split('_')[0], 10);
          if (prefixNum > highestPrefix) {
            highestPrefix = prefixNum;
          }
        }
      }
    }
    // New numbering will start from the next number.
    const startNumber = highestPrefix + 1;

    let files = [];
    for (const entry of entries) {
      const fullPath = path.join(directory, entry);
      const stat = await fs.stat(fullPath);

      if (stat.isFile()) {
        const extension = path.extname(entry).toLowerCase();
        if (skipExtensions.includes(extension)) {
          continue; // Skip extensions
        }

        // only process un-numbered files in non-force mode
        if (!force && hasPrefixRegex.test(entry)) {
          continue;
        }

        files.push(entry);
      }
    }

    if (files.length === 0) {
      console.log('✅ No new files needed renaming.');
      return;
    }
	// Always sort based on the "base name" of the file.
	// This ensures that '10_z-file.txt' is treated as 'z-file.txt' for sorting purposes.
    files.sort((a, b) => {
		const baseA = stripNumberPrefix(a);
		const baseB = stripNumberPrefix(b);
		return baseA.localeCompare(baseB);
});

    for (let i = 0; i < files.length; i++) {
      const oldName = files[i];
      // Only strip the prefix if `force` is true ---
	  const baseName = force ? stripNumberPrefix(oldName) : oldName;

      // Use the startNumber for calculations ---
      const currentNumber = startNumber + i;
      // The final number will be the start number plus how many new files we have.
      const finalHighestNumber = highestPrefix + files.length;

      const maxDigits = Math.max(2, String(finalHighestNumber).length);
      const numberPrefix = String(currentNumber).padStart(maxDigits, '0');
      // --- END OF MODIFICATION ---
      
      const newName = `${numberPrefix}_${baseName}`;
      const oldPath = path.join(directory, oldName);
      const newPath = path.join(directory, newName);

      if (oldPath !== newPath) {
        await fs.rename(oldPath, newPath);
        console.log(`Renamed: ${oldName} → ${newName}`);
      }
    }

    console.log('✅ All files renamed successfully.');
  } catch (err) {
    console.error('❌ An error occurred:', err.message);
  }
}
// Export the function to be used in other files
module.exports = sortAndRenameFiles;