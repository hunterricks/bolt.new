const { execSync } = require('child_process');

function gitPush() {
  try {
    // Add all changes
    execSync('git add .', { stdio: 'inherit' });

    // Commit changes
    const commitMessage = `Update ${new Date().toISOString()}`;
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });

    // Push to remote
    execSync('git push origin main', { stdio: 'inherit' });

    console.log('Successfully pushed to GitHub');
  } catch (error) {
    console.error('Error pushing to GitHub:', error.message);
  }
}

gitPush();
