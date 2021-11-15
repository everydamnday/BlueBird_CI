pipeline {
    agent {
    kubernetes {
      label 'mypod'
      yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: docker
    image: docker
    command: ['cat']
    tty: true
    volumeMounts:
    - mountPath: /var/run/docker.sock
      name: docker-socket
  volumes:
  - name: docker-socket
    hostPath:
        path: /var/run/docker.sock
    
"""
    }
  }
    tools {
        git "git"
        nodejs "node16"
    }
    environment {
        registryCredential = 'dockerhub'
    }
    stages {
        stage('clone') {
            steps {
                git branch: "dev_back", url: "https://github.com/SSUMINI/BlueBird_CI.git"
            }
        }
        stage('build') {
            steps {
                dir('bluebird_ci') {
                     sh "ls -al"
                     sh "npm install"
                }
            }
        }
        stage('image build') {
            steps {
              dir('bluebird_ci') {
                container('docker') {
                sh "docker build -t gkstnals24/bluebird:2.0 ."
                sh "docker images"
                }
              }
            }
        }
        stage('image push') {
            steps {
                container('docker') {
                    withDockerRegistry([ credentialsId: registryCredential, url: "" ]) {
                        sh "docker images"
                        sh "docker push gkstnals24/bluebird:2.0"
                        sh "docker rmi hgkstnals24/bluebird:2.0"
                    }
                }
            }
        }
    }
}
