#Getting Started with Escapade React App
#Available Scripts
When you first pull from GitHub, the required npm packages may not follow. To ensure they're installed, run the following:

====================================================================

npm install express express-session mongoose
====================================================================
To test the app, you'll need two separate terminals:

#For the server:

====================================================================

nodemon server.js
====================================================================
#For the React app:


====================================================================

npm run start
====================================================================
This will run the app in development mode. Open http://localhost:3000 to view it in your browser. The app will automatically reload if you make changes. You'll also be notified of linting errors in the console.

====================================================================

npm test
====================================================================
To run tests, first ensure Jest is installed in your project. If you haven't installed it yet:

 
====================================================================

npm install jest --save-dev
npm run build
====================================================================
This builds the app for production in the build folder, bundling React in production mode and optimizing for the best performance. The build is minified, and filenames include hashes.

====================================================================

npm run eject
====================================================================
Prerequisites:

Before you start, make sure the following are installed:

Node.js (version 8 or 10):

====================================================================

brew install node
====================================================================
npm (Installed alongside Node.js)

#selenium-side-runner:

 
====================================================================

npm install -g selenium-side-runner
====================================================================
#Browser Specific Drivers:

Depending on the browser you wish to use, you'll need to install the corresponding driver:

#Chrome:

====================================================================

npm install -g chromedriver
====================================================================
#Microsoft Edge (Windows only):


====================================================================

npm install -g edgedriver
====================================================================
#Firefox:


====================================================================

npm install -g geckodriver
====================================================================
#Internet Explorer (Windows only):


====================================================================

npm install -g iedriver
====================================================================
⚠️ Note: IEDriver might require additional setup. More details available in the official documentation.

Safari:
SafariDriver is bundled with macOS.

Launching Selenium Runner:

After installing the prerequisites, you can run your tests:


====================================================================

selenium-side-runner /path/to/your-project.side
====================================================================
For multiple .side files, use:


====================================================================

selenium-side-runner /path/to/*.side
====================================================================
This command runs your tests in parallel across different browser windows, distributed over your machine's available CPU cores.

Running Tests on Different Browsers Locally:

To specify a different browser for local test execution:


====================================================================

selenium-side-runner -c "browserName=chrome"
selenium-side-runner -c "browserName='internet explorer'"
selenium-side-runner -c "browserName=edge"
selenium-side-runner -c "browserName=firefox"
selenium-side-runner -c "browserName=safari"
====================================================================
