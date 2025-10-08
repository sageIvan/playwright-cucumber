const { generateSpecFiles } = require('./generate-specs.js');
const fs = require('fs');
const path = require('path');

console.log('🔄 Regenerating Playwright specs from Cucumber features...');

// Clean existing spec files
const testsDir = './tests-playwright';
if (fs.existsSync(testsDir)) {
    const files = fs.readdirSync(testsDir);
    files.forEach(file => {
        if (file.endsWith('.spec.ts')) {
            fs.unlinkSync(path.join(testsDir, file));
            console.log(`   ✓ Removed ${file}`);
        }
    });
}

// Generate new files
const success = generateSpecFiles();

if (success) {
    console.log('✅ Spec files regenerated successfully!');
    console.log('💡 Run "npm run playwright:ui" to open the UI with new tests');
} else {
    console.error('❌ Failed to regenerate spec files');
    process.exit(1);
}