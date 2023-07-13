pipeline {
  agent any

  stages {
    stage('Prepare') {
      steps {
        // Install n (Node.js version manager) locally
        sh 'sudo npm install -g n'
        // Install Node.js v18.16.1
        sh 'sudo n 18.16.1'
        // Use Node.js v18.16.1 for this stage
        sh 'node --version'
        sh 'npm --version'
        // Increase the fetch retry timeout to 50 minutes
        sh 'npm config set fetch-retry-maxtimeout 3000000'
        // Clear npm cache
        sh 'npm cache clean --force'
      }
    }

    stage('Install Dependencies') {
      steps {
        retry(3) {
            sh 'npm ci'
        }
      }
    }

    stage('Start Server') {
      steps {
        sh 'npm run server'
      }
    }

    stage('Build') {
      steps {
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
