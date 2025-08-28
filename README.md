# File Sorter Utility

[](https://www.google.com/search?q=https://www.npmjs.com/package/file-sorter-utility)
[](https://opensource.org/licenses/ISC)

A simple and flexible command-line tool and library to sort files in a directory and rename them with a numeric prefix.

This tool is perfect for organising media files, documents, or any collection of files where a specific order is desired. It can be run on a folder to perform an initial sort and can also be run again to incrementally add new numbered files without disrupting the existing order.

## Key Features

  * **Numeric Prefixes**: Sorts files alphabetically and adds a zero-padded numeric prefix (e.g., `01_`, `02_`).
  * **Force Re-numbering**: An option to strip all existing prefixes and re-number the entire directory.
  * **Skip Extensions**: Ignore certain file types (e.g., `.log`, `.tmp`) during the process.
  * **Incremental Mode**: Automatically detects existing numbered files and continues numbering from the last number when new files are added.
  * **Dual Usage**: Can be used as a powerful command-line tool or as a library in your own Node.js projects.

-----

## Installation

For command-line use, install the package globally:

```bash
npm install -g file-sorter-utility
```

For use as a library in your own project, install it locally:

```bash
npm install file-sorter-utility
```

-----

## CLI Usage

The command is run by specifying a target directory and any desired options.

```bash
file-sorter <directory> [options]
```

### Options

| Option               | Description                                                                     |
| -------------------- | ------------------------------------------------------------------------------- |
| `--force`            | Strips all existing number prefixes and re-numbers the entire directory from `01`. |
| `--skip .ext1,.ext2` | A comma-separated list of file extensions to ignore (e.g., `--skip .log,.tmp`).   |

### Examples

**1. Basic Sort**
To sort all files in a folder named `my-photos` on your desktop:

```bash
file-sorter "C:\Users\YourUser\Desktop\my-photos"
```

**2. Incremental Add**
If `my-photos` already contains files up to `05_...` and you add new files, simply run the same command again. The new files will be numbered starting from `06_...`.

```bash
file-sorter "C:\Users\YourUser\Desktop\my-photos"
```

**3. Force Re-number and Skip Files**
To re-sort the entire directory from scratch, ignoring `.txt` and `.log` files:

```bash
file-sorter "C:\Users\YourUser\Desktop\my-photos" --force --skip .txt,.log
```

-----

## Library Usage

You can also use the functions directly in your Node.js code.

```javascript
const sortAndRenameFiles = require('file-sorter-utility');

const targetDirectory = './path/to/your/files';

// Example 1: Run the main sorting function with options
async function organizeMyFiles() {
  try {
    await sortAndRenameFiles(targetDirectory, {
      force: false,
      skipExtensions: ['.tmp']
    });
    console.log('Done!');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

organizeMyFiles();
```

-----

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

-----

## 📬 Contact

Mathan Kumar - [gmathankumar.github.io](https://gmathankumar.github.io)

Project Link: [https://github.com/gmathankumar/file-sorter-utility](https://github.com/gmathankumar/file-sorter-utility)