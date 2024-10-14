console.log('Starting test script...');

// Test basic console output
console.log('Hello, World!');

// Test file system access
const fs = require('fs').promises;

async function testFileSystem() {
  try {
    console.log('Testing file system access...');
    const files = await fs.readdir('.');
    console.log('Files in current directory:', files);

    // Test writing to a file
    await fs.writeFile('test.txt', 'This is a test file.');
    console.log('Successfully wrote to test.txt');

    // Test reading from a file
    const content = await fs.readFile('test.txt', 'utf8');
    console.log('Content of test.txt:', content);

    // Clean up
    await fs.unlink('test.txt');
    console.log('Deleted test.txt');

  } catch (error) {
    console.error('Error during file system test:', error);
  }
}

// Test environment variables
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('GITHUB_TOKEN:', process.env.GITHUB_TOKEN ? 'Set' : 'Not set');

// Run the file system test
testFileSystem().then(() => {
  console.log('Test script completed.');
}).catch((error) => {
  console.error('Unhandled error in test script:', error);
});
