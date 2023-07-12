pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        // Install n (Node.js version manager)
        sh 'npm install -g n'
        // Install Node.js v16.13
        sh 'n 16.13.0'
        // Use Node.js v16.13 for this stage
        sh 'npm ci'
        sh 'npm run build'
      }
    }
    
    stage('Test') {
      steps {
        // Use Node.js v16.13 for this stage
        sh 'npm run test'
      }
    }

    stage('Deploy') {
      steps {
        // Use Node.js v16.13 for this stage
        sh 'npm install -g surge' // Install Surge for deployment
        sh 'surge --project ./build --domain localhost:3000' 
      }
    }
  }
}
