const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

console.log('🎭 Cucumber to Playwright Spec Generator & UI Launcher');
console.log('======================================================');

const featuresDir = './features';
const testsDir = './tests-playwright';
const configFile = './playwright.config.ts';

// Function to clean existing spec files
function cleanSpecFiles() {
    console.log('🧹 Cleaning existing spec files...');
    if (fs.existsSync(testsDir)) {
        const files = fs.readdirSync(testsDir);
        files.forEach(file => {
            if (file.endsWith('.spec.ts')) {
                fs.unlinkSync(path.join(testsDir, file));
                console.log(`   ✓ Removed ${file}`);
            }
        });
    }
}

// Function to read a feature file and extract scenarios
function parseFeatureFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    let feature = '';
    let scenarios = [];
    let currentScenario = null;
    let background = '';
    
    for (let line of lines) {
        line = line.trim();
        
        if (line.startsWith('Feature:')) {
            feature = line.replace('Feature:', '').trim();
        } else if (line.startsWith('Background:')) {
            background = 'background';
        } else if (line.startsWith('Scenario:')) {
            if (currentScenario) scenarios.push(currentScenario);
            currentScenario = {
                name: line.replace('Scenario:', '').trim(),
                steps: []
            };
        } else if (line.startsWith('Given ') || line.startsWith('When ') || line.startsWith('Then ') || line.startsWith('And ')) {
            if (currentScenario) {
                currentScenario.steps.push(line);
            }
        }
    }
    
    if (currentScenario) scenarios.push(currentScenario);
    
    return { feature, scenarios, background };
}

// Function to convert Cucumber steps to Playwright code
function stepToPlaywright(step) {
    const stepLower = step.toLowerCase();
    
    // Navigation steps
    if (stepLower.includes('navigate to') || stepLower.includes('go to')) {
        const urlMatch = step.match(/"([^"]+)"/);
        if (urlMatch) {
            return `    await page.goto('${urlMatch[1]}');`;
        }
    }
    
    // Title checks
    if (stepLower.includes('page title should be')) {
        const titleMatch = step.match(/"([^"]+)"/);
        if (titleMatch) {
            const escapedTitle = escapeString(titleMatch[1]);
            return `    await expect(page).toHaveTitle('${escapedTitle}');`;
        }
    }
    
    // Text visibility checks
    if (stepLower.includes('should see text') || stepLower.includes('should see the main heading')) {
        const textMatch = step.match(/"([^"]+)"/);
        if (textMatch) {
            const escapedText = escapeString(textMatch[1]);
            return `    await expect(page.getByText('${escapedText}')).toBeVisible();`;
        }
    }
    
    // Link checks
    if (stepLower.includes('should see a link')) {
        const linkMatch = step.match(/"([^"]+)"/);
        if (linkMatch) {
            const escapedText = escapeString(linkMatch[1]);
            return `    await expect(page.locator('a', { hasText: '${escapedText}' })).toBeVisible();`;
        }
    }
    
    // Click actions
    if (stepLower.includes('click on')) {
        const clickMatch = step.match(/"([^"]+)"/);
        if (clickMatch) {
            const escapedText = escapeString(clickMatch[1]);
            return `    await page.click('text=${escapedText}');`;
        }
    }
    
    // URL checks
    if (stepLower.includes('url should contain')) {
        const urlMatch = step.match(/"([^"]+)"/);
        if (urlMatch) {
            const escapedUrl = escapeString(urlMatch[1]);
            return `    expect(page.url()).toContain('${escapedUrl}');`;
        }
    }
    
    // Page loaded checks
    if (stepLower.includes('page is loaded') || stepLower.includes('page should be fully loaded')) {
        return `    await page.waitForLoadState('networkidle');`;
    }
    
    // Generic browser opening
    if (stepLower.includes('open a new browser window') || stepLower.includes('browser window')) {
        return `    // Browser window opened automatically by Playwright`;
    }
    
    // Default comment for unrecognized steps
    return `    // TODO: Implement step - ${step}`;
}

// Function to escape strings for JavaScript code generation
function escapeString(str) {
    return str
        .replace(/\\/g, '\\\\')  // Escape backslashes first
        .replace(/'/g, "\\'")    // Escape single quotes
        .replace(/"/g, '\\"')    // Escape double quotes
        .replace(/\n/g, '\\n')   // Escape newlines
        .replace(/\r/g, '\\r')   // Escape carriage returns
        .replace(/\t/g, '\\t');  // Escape tabs
}

// Function to generate spec file content
function generateSpecFile(featureData, fileName) {
    const specName = fileName.replace('.feature', '');
    let content = `import { test, expect } from '@playwright/test';\n\n`;
    
    // Use double quotes to avoid apostrophe issues, escape only double quotes
    const escapedFeature = featureData.feature.replace(/"/g, '\\"');
    content += `test.describe("${escapedFeature}", () => {\n`;
    
    // Add beforeEach if there are common navigation steps
    const hasNavigation = featureData.scenarios.some(s => 
        s.steps.some(step => step.toLowerCase().includes('navigate to') || step.toLowerCase().includes('browser window'))
    );
    
    if (hasNavigation) {
        content += `  test.beforeEach(async ({ page }) => {\n`;
        content += `    // Setup before each test\n`;
        content += `  });\n\n`;
    }
    
    // Generate test cases for each scenario
    featureData.scenarios.forEach(scenario => {
        // Use double quotes to avoid apostrophe issues, escape only double quotes
        const escapedName = scenario.name.replace(/"/g, '\\"');
        content += `  test("${escapedName}", async ({ page }) => {\n`;
        scenario.steps.forEach(step => {
            content += stepToPlaywright(step) + '\n';
        });
        content += `  });\n\n`;
    });
    
    content += `});\n`;
    
    return content;
}

// Function to generate all spec files
function generateSpecFiles() {
    console.log('🔄 Generating Playwright spec files from Cucumber features...');
    
    if (!fs.existsSync(featuresDir)) {
        console.error(`❌ Features directory not found: ${featuresDir}`);
        return false;
    }
    
    // Ensure tests directory exists
    if (!fs.existsSync(testsDir)) {
        fs.mkdirSync(testsDir, { recursive: true });
    }
    
    const featureFiles = fs.readdirSync(featuresDir).filter(file => file.endsWith('.feature'));
    
    if (featureFiles.length === 0) {
        console.log('⚠️  No feature files found');
        return false;
    }
    
    featureFiles.forEach(file => {
        const featurePath = path.join(featuresDir, file);
        const featureData = parseFeatureFile(featurePath);
        
        if (featureData.scenarios.length > 0) {
            const specContent = generateSpecFile(featureData, file);
            const specFileName = file.replace('.feature', '.spec.ts');
            const specPath = path.join(testsDir, specFileName);
            
            fs.writeFileSync(specPath, specContent);
            console.log(`   ✓ Generated ${specFileName} (${featureData.scenarios.length} scenarios)`);
        }
    });
    
    return true;
}

// Function to start Playwright UI
function startPlaywrightUI() {
    console.log('🚀 Starting Playwright UI...');
    
    // Kill any existing Playwright processes
    try {
        if (process.platform === 'win32') {
            execSync('taskkill /f /im node.exe /fi "WINDOWTITLE eq Playwright*" 2>nul', { stdio: 'ignore' });
        }
    } catch (e) {
        // Ignore errors, process might not exist
    }
    
    // Start new Playwright UI process
    const uiProcess = spawn('npx', ['playwright', 'test', '--ui'], {
        stdio: 'inherit',
        shell: true,
        detached: false
    });
    
    console.log('✅ Playwright UI started!');
    console.log('🌐 UI should open at: http://localhost:3000');
    console.log('🛑 Press Ctrl+C to stop');
    
    // Handle cleanup on exit
    process.on('SIGINT', () => {
        console.log('\n🛑 Stopping Playwright UI...');
        uiProcess.kill();
        process.exit(0);
    });
    
    return uiProcess;
}

// Main execution
async function main() {
    try {
        // Step 1: Clean existing files
        cleanSpecFiles();
        
        // Step 2: Generate new spec files
        const success = generateSpecFiles();
        
        if (!success) {
            console.error('❌ Failed to generate spec files');
            process.exit(1);
        }
        
        console.log('\n🎉 Spec files generated successfully!');
        
        // Step 3: Start Playwright UI
        startPlaywrightUI();
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { main, generateSpecFiles, startPlaywrightUI };