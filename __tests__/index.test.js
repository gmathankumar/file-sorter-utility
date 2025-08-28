const fs = require('fs').promises;
const path = require('path');
const sortAndRenameFiles = require('../index'); // Adjust path to your main file

// Define a path for a temporary directory for our tests
const TEST_DIR = path.join(__dirname, 'test-files');

// Jest's `beforeEach` runs before each test in this file.
// We'll create a clean directory with some dummy files.
beforeEach(async () => {
  await fs.mkdir(TEST_DIR, { recursive: true });
  // Create a predictable set of files to test against
  await fs.writeFile(path.join(TEST_DIR, 'c-file.txt'), 'content');
  await fs.writeFile(path.join(TEST_DIR, 'a-file.log'), 'content');
  await fs.writeFile(path.join(TEST_DIR, 'b-file.jpg'), 'content');
});

// Jest's `afterEach` runs after each test.
// We'll clean up by deleting the temporary directory.
afterEach(async () => {
  await fs.rm(TEST_DIR, { recursive: true, force: true });
});

// `describe` groups related tests together.
describe('sortAndRenameFiles', () => {

  // The `it` block defines an individual test case.
  it('should rename and prefix files in alphabetical order', async () => {
    // 1. Run the function we want to test
    await sortAndRenameFiles(TEST_DIR);

    // 2. Check the results
    const files = await fs.readdir(TEST_DIR);
    
    // 3. Assert our expectations
    // We expect the files to be sorted alphabetically and then prefixed.
    const expected = ['01_a-file.log', '02_b-file.jpg', '03_c-file.txt'];
    expect(files.sort()).toEqual(expected.sort());
  });

  it('should skip files based on the skipExtensions option', async () => {
    await sortAndRenameFiles(TEST_DIR, { skipExtensions: ['.log'] });

    const files = await fs.readdir(TEST_DIR);
    const expected = ['a-file.log', '01_b-file.jpg', '02_c-file.txt'];
    
    expect(files.sort()).toEqual(expected.sort());
  });
  
  it('should re-number files correctly when force is true', async () => {
    // First, create a file that already has a prefix
    await fs.writeFile(path.join(TEST_DIR, '10_z-file.txt'), 'content');
    
    await sortAndRenameFiles(TEST_DIR, { force: true });
    
    const files = await fs.readdir(TEST_DIR);
    const expected = [
        '01_a-file.log', 
        '02_b-file.jpg', 
        '03_c-file.txt', 
        '04_z-file.txt' // Note the stripped prefix and new number
    ];
        
    expect(files.sort()).toEqual(expected.sort());
  });

  it('should not rename files that already have the correct prefix', async () => {
    // Run it once
    await sortAndRenameFiles(TEST_DIR);
    let filesAfterFirstRun = await fs.readdir(TEST_DIR);
    expect(filesAfterFirstRun.sort()).toEqual(['01_a-file.log', '02_b-file.jpg', '03_c-file.txt'].sort());

    // Run it a second time without force. Nothing should change.
    await sortAndRenameFiles(TEST_DIR);
    let filesAfterSecondRun = await fs.readdir(TEST_DIR);
    expect(filesAfterSecondRun).toEqual(filesAfterFirstRun);
  });
});