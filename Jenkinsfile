pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        sh 'npm ci' // Use 'npm ci' for clean installation
        sh 'npm run build'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test' // Run the tests
      }
    }

    stage('Deploy') {
      steps {
        sh 'npm install -g npm@18.16.0' // Install la bonne version de npm
        sh 'npm install -g surge' 
        sh 'surge --project ./build --domain http://localhost:3000' // pour le moment sur le port 3000
      }
    }
  }

  post {
    success {
      echo 'Pipeline completed successfully'
    }

    failure {
      echo 'Pipeline failed, please check the build and test stages'
    }
  }
}
