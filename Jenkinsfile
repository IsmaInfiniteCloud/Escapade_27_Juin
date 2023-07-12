pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        // Install n (Node.js version manager) globally
        sh 'sudo npm install -g n'
        // Install Node.js v18.16.1
        sh 'sudo n 18.16.1'
        // Verify the Node.js and npm version
        sh 'node --version'
        sh 'npm --version'
        sh 'npm config set fetch-retry-maxtimeout 600000'
        // Install dependencies and build the project
        sh 'npm ci'
        sh 'npm run build'
      }
    }
    
    stage('Test') {
      steps {
        // Run tests
        sh 'npm run test'
      }
    }

    stage('Deploy') {
      steps {
        // Install Surge for deployment
        sh 'sudo npm install -g surge'
        sh 'surge --project ./build --domain localhost:3000' 
      }
    }
  }
}
