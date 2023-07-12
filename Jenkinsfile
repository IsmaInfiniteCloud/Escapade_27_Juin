pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        script {
          sh 'sudo /home/ubuntu/.nvm/versions/node/v18.16.0/bin/npm ci'
          sh 'sudo /home/ubuntu/.nvm/versions/node/v18.16.0/bin/npm run build'
        }
      }
    }
    
    stage('Test') {
      steps {
        script {
          sh 'sudo /home/ubuntu/.nvm/versions/node/v18.16.0/bin/npm run test'
        }
      }
    }

    stage('Deploy') {
      steps {
        script {
          sh 'sudo /home/ubuntu/.nvm/versions/node/v18.16.0/bin/npm install -g surge' // Install Surge for deployment
          sh 'sudo /home/ubuntu/.nvm/versions/node/v18.16.0/bin/surge --project ./build --domain localhost:3000' 
        }
      }
    }
  }
}
