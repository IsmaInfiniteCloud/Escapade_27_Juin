pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }

    stage('Test') {
      steps {
        sh 'npm run test'
      }
    }

    stage('Deploy') {
      steps {
        sh 'npm install -g surge' // Install Surge for deployment
        sh 'surge --project ./build --domain yourdomain.surge.sh' // Replace 'yourdomain' with your actual domain
      }
    }
  }
}
