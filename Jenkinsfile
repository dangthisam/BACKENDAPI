pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'nguyenvansam123/backend-api:latest'
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'
        DEPLOY_PATH = '/home/nvs/production-app'
    }

    stages {
        stage('1. Checkout Code') {
            steps {
                echo 'Pulling latest code from Git...'
            }
        }

        stage('2. Build Docker Image') {
            steps {
                echo 'Building Docker image without cache...'
                // Thêm cờ --no-cache để bắt buộc copy code mới nhất
                sh "docker build --no-cache -t ${DOCKER_IMAGE} ."
            }
        }

        stage('3. Push to Docker Hub') {
            steps {
                echo 'Logging in and pushing to Docker Hub...'
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push ${DOCKER_IMAGE}
                    '''
                }
            }
        }

        stage('4. Deploy on Server') {
            steps {
                echo 'Deploying and recreating container...'
                dir("${DEPLOY_PATH}") {
                    // Ép pull bản mới và bắt buộc hủy container cũ tạo container mới
                    sh '''
                        docker compose pull node-api
                        docker compose up -d --force-recreate --no-deps node-api
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check logs.'
        }
    }
}