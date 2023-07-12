pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        // Install n (Node.js version manager) locally
        sh 'npm install n'
        // Install Node.js v18.16.1
        sh 'n 18.16.1'
        // Use Node.js v18.16.1 for this stage
        sh 'npm ci'
        sh 'npm run build'
      }
    }
    
    stage('Test') {
      steps {
        // Use Node.js v18.16.1 for this stage
        sh 'npm run test'
      }
    }

    stage('Deploy') {
      steps {
        // Use Node.js v18.16.1 for this stage
        sh 'npm install -g surge' // Install Surge for deployment
        sh 'surge --project ./build --domain localhost:3000' 
      }
    }
  }
}
