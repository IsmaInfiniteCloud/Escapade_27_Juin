pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        sh '/home/ismail/.nvm/versions/node/v18.16.0/bin/npm ci'
        sh '/home/ismail/.nvm/versions/node/v18.16.0/bin/npm run build'
      }
    }
    
    stage('Test') {
      steps {
        sh '/home/ismail/.nvm/versions/node/v18.16.0/bin/npm run test'
      }
    }

    stage('Deploy') {
      steps {
        sh '/home/ismail/.nvm/versions/node/v18.16.0/bin/npm install -g surge' // Install Surge for deployment
        sh '/home/ismail/.nvm/versions/node/v18.16.0/bin/surge --project ./build --domain localhost:3000' 
      }
    }
  }
}
