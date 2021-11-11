podTemplate(label: 'docker-build', 
  containers: [
    containerTemplate(
      name: 'git',
      image: 'alpine/git',
      command: 'cat',
      ttyEnabled: true
    ),
    containerTemplate(
      name: 'docker',
      image: 'docker',
      command: 'cat',
      ttyEnabled: true
    ),
  ],
  volumes: [ 
    hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'), 
  ]
) {
    node('docker-build') {
        
        
        environment {
        registry = "phcxio7949/project"
        registryCredential = 'dockerhub'
        dockerImage = ''
        }
        
        stage('Checkout'){
            container('git'){
                 sh 'git clone -b dev_back https://github.com/SSUMINI/BlueBird_CI.git'
            }
        }
        
         stage('build') {
            
            dir('BlueBird_CI') {
                sh "ls -al"
                sh "npm install"     
            }
            
        }
        
        stage('Image Build'){
            dir('BlueBird_CI') {    
                container('docker'){
                
                    sh "docker build -t phcxio7949/project:1.01 ."
                    sh "docker images"
                
                }
            }    
        }
        

        stage('Push'){
            container('docker'){
                 withDockerRegistry([ credentialsId: registryCredential, url: "" ]) {
                        sh "docker images"
                        sh "docker push phcxio7949/project:1.01"
                        sh "docker rmi phcxio7949/project:1.01"
            }
        }
    }
    
}
}
