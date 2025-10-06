# 📚 Playwright Tutorial: Learn Web Automation Step by Step

Welcome to the **Playwright Tutorial for Non-Technical People**! This project is designed to teach web automation using Playwright and Cucumber in a progressive, easy-to-understand manner.

## 🎯 What You'll Learn

This tutorial takes you from complete beginner to confident web automation tester through **5 progressive lessons**:

### 📖 Lesson 1: Basic Web Navigation
**File:** `features/01-basic-navigation.feature`
- How to open a website (like typing a URL in your browser)
- Understanding when a page is loaded
- Checking page titles and URLs
- **Skills:** Basic navigation, page verification

### 🔍 Lesson 2: Finding Things on Webpages  
**File:** `features/02-finding-elements.feature`
- How to look for specific text on a webpage
- Finding buttons, links, and other clickable elements
- Understanding HTML elements (headings, paragraphs, links)
- **Skills:** Element location, text verification

### 👆 Lesson 3: Clicking and Interacting
**File:** `features/03-clicking-interactions.feature`
- Clicking on links and buttons
- Filling out forms (typing in input fields)
- Working with dropdowns and selections
- Submitting forms
- **Skills:** User interactions, form handling

### ⏰ Lesson 4: Waiting and Timing
**File:** `features/04-waiting-timing.feature`
- Understanding why we need to wait for websites
- Handling slow-loading content
- Dealing with timeouts and errors
- **Skills:** Patience in automation, timing control

### 🚀 Lesson 5: Advanced Real-World Scenarios
**File:** `features/05-advanced-scenarios.feature`
- Working with real websites (e-commerce, login forms)
- Handling JavaScript alerts and popups
- Testing dynamic content that changes
- File uploads (demonstration)
- **Skills:** Real-world application, complex scenarios

### 🌐 Lesson 6: Introduction to API Testing
**File:** `features/06-api-basics.feature`
- Understanding what APIs are (like invisible waiters)
- Making GET requests to retrieve data
- Checking response status codes and JSON data
- Validating response structure and content
- **Skills:** API basics, REST concepts, JSON validation

### 📡 Lesson 7: Different HTTP Methods
**File:** `features/07-api-methods.feature`
- POST requests (creating new data)
- PUT requests (updating entire records)
- PATCH requests (partial updates)
- DELETE requests (removing data)
- **Skills:** CRUD operations, HTTP methods, request/response patterns

### 🔐 Lesson 8: Advanced API Testing
**File:** `features/08-api-advanced.feature`
- Authentication with headers and tokens
- Error handling and validation testing
- Performance and rate limit testing
- Schema validation and data workflows
- **Skills:** Authentication, performance testing, complex validations

## 🏃‍♀️ How to Run the Tutorial

### Prerequisites
Make sure you have Node.js installed, then run:
```bash
npm install
```

### Running Individual Lessons

#### Start with Lesson 1 (Recommended for beginners):
```bash
npm test -- --tags "@lesson-1"
```

#### Progress through each lesson:
```bash
# Lesson 2 - Finding Elements
npm test -- --tags "@lesson-2"

# Lesson 3 - Interactions
npm test -- --tags "@lesson-3"

# Lesson 4 - Waiting
npm test -- --tags "@lesson-4"

# Lesson 5 - Advanced Web Testing
npm test -- --tags "@lesson-5"

# Lesson 6 - API Basics
npm test -- --tags "@lesson-6"

# Lesson 7 - HTTP Methods
npm test -- --tags "@lesson-7"

# Lesson 8 - Advanced API Testing
npm test -- --tags "@lesson-8"
```

#### Or use the convenient shortcuts:
```bash
npm run tutorial:lesson1    # Basic Navigation
npm run tutorial:lesson2    # Finding Elements
npm run tutorial:lesson3    # Interactions
npm run tutorial:lesson4    # Waiting & Timing
npm run tutorial:lesson5    # Advanced Web
npm run tutorial:lesson6    # API Basics
npm run tutorial:lesson7    # HTTP Methods
npm run tutorial:lesson8    # Advanced API
```

### Running by Difficulty Level

#### Easy scenarios (great for beginners):
```bash
npm test -- --tags "@easy"
```

#### Medium difficulty:
```bash
npm test -- --tags "@medium"
```

#### Hard/Expert level:
```bash
npm test -- --tags "@hard or @expert"
```

### Run All Tutorial Lessons:
```bash
npm test -- --tags "@tutorial"
# OR
npm run tutorial
```

### Run API Testing Only:
```bash
npm test -- --tags "@api"
# OR
npm run tutorial:api
```

## 📋 Understanding the Results

When you run a test, you'll see:

✅ **Green checkmarks** = Things that worked correctly  
❌ **Red X marks** = Things that failed (this is how you learn!)  
➡️ **Arrows** = Actions being performed  

Example output:
```
→ Navigating to: https://example.com
✓ Browser window opened successfully
✓ Page loaded successfully
✓ Found text: "Example Domain"
```

## 🎓 Learning Path Recommendations

### For Complete Beginners:
1. Start with `@lesson-1` and `@easy` tags
2. Read the feature files to understand what each test does
3. Run tests one lesson at a time
4. Experiment by changing the test scenarios

### For People with Some Technical Background:
1. Run `@lesson-1` through `@lesson-3` quickly
2. Focus on `@lesson-4` and `@lesson-5`
3. Try `@medium` and `@hard` scenarios
4. Look at the step definitions to understand the code

### For Developers Learning Playwright:
1. Study the step definitions in `support/step-definitions/`
2. Understand the world.ts and hooks.ts setup
3. Try modifying existing scenarios
4. Create your own test scenarios

## 📁 Project Structure

```
├── features/                          # All tutorial lessons
│   ├── 01-basic-navigation.feature    # Lesson 1: Navigation basics
│   ├── 02-finding-elements.feature    # Lesson 2: Finding elements
│   ├── 03-clicking-interactions.feature # Lesson 3: User interactions
│   ├── 04-waiting-timing.feature      # Lesson 4: Timing and waits
│   ├── 05-advanced-scenarios.feature  # Lesson 5: Real-world tests
│   └── sample.feature                 # Original example (Google)
├── support/
│   ├── step-definitions/
│   │   ├── tutorial-steps.ts          # Steps for lessons 1-3
│   │   ├── tutorial-advanced-steps.ts # Steps for lessons 4-5
│   │   └── sample-steps.ts            # Original Google example
│   ├── hooks.ts                       # Browser setup/teardown
│   └── world.ts                       # Shared test context
└── README.md                          # This guide
```

## 🌐 Websites Used in This Tutorial

We use these **safe, public websites** for learning:

- **example.com** - Simple, stable website perfect for beginners
- **httpbin.org** - Testing HTTP requests and forms
- **the-internet.herokuapp.com** - Made specifically for automation practice
- **demo.opencart.com** - Real e-commerce demo site

All these websites are designed for testing and learning!

## 💡 Tips for Success

1. **Start Slow**: Don't rush through the lessons
2. **Read the Features**: Each `.feature` file explains what the test does in plain English
3. **Experiment**: Try changing URLs or text in the tests
4. **Ask Questions**: Look at the step definitions if you want to understand the code
5. **Practice**: Re-run tests multiple times to see consistent behavior

## 🔧 Troubleshooting

### Tests are failing?
- **Internet connection**: Make sure you're connected to the internet
- **Website changes**: Some websites might have changed since tutorial creation
- **Timeouts**: Some tests might need more time on slower connections

### Want to see what's happening?
Run tests in headed mode (with visible browser):
```bash
npm run test:headed -- --tags "@lesson-1"
```

### Need to debug?
Use the debug tag:
```bash
npm run test:debug
```

## 🎉 Next Steps

After completing all lessons:
1. Try creating your own test scenarios
2. Test your favorite websites (be respectful!)
3. Learn more about Playwright's advanced features
4. Share your knowledge with others!

## 📞 Need Help?

- Check the console output for detailed error messages
- Look at the step definitions to understand what's happening
- Try running tests one at a time to isolate issues
- Remember: Failing tests are learning opportunities!

---

**Happy Learning! 🚀**

*Remember: The goal is not to memorize, but to understand how web automation works. Take your time and experiment!*