pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        // Installer Node.js v16.13
        sh 'nvm install 16.13'
        // Utiliser Node.js v16.13 pour cette étape
        sh '/home/ismail/.nvm/versions/node/16.13/bin/npm ci'
        sh '/home/ismail/.nvm/versions/node/16.13/bin/npm run build'
      }
    }
    
    stage('Test') {
      steps {
        // Utiliser Node.js v16.13 pour cette étape
        sh '/home/ismail/.nvm/versions/node/16.13/bin/npm run test'
      }
    }

    stage('Deploy') {
      steps {
        // Utiliser Node.js v16.13 pour cette étape
        sh '/home/ismail/.nvm/versions/node/16.13/bin/npm install -g surge' // Installer Surge pour le déploiement
        sh '/home/ismail/.nvm/versions/node/16.13/bin/surge --project ./build --domain localhost:3000' 
      }
    }
  }
}
