pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        // Install n (Node.js version manager) locally
        sh 'sudo npm install -g n'
        // Install Node.js v18.16.1
        sh 'sudo n 18.16.1'
        // Use Node.js v18.16.1 for this stage
        sh 'node --version'
        sh 'npm --version'
        // Increase the fetch retry timeout to 20 minutes
        sh 'npm config set fetch-retry-maxtimeout 1200000'
        sh 'npm ci'
        sh 'npm run build'
      }
    }

    stage('Deploy') {
      steps {
        // Use Node.js v18.16.1 for this stage
        sh 'sudo npm install -g surge' // Install Surge for deployment
        sh 'surge --project ./build --domain localhost:3000' 
      }
    }
  }
}
