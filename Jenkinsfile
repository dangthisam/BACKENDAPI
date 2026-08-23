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
                // Jenkins tự động checkout branch từ repository bạn cấu hình
                echo 'Pulling code from Git repository...'
            }
        }

        stage('2. Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh "docker build -t ${DOCKER_IMAGE} ."
            }
        }

        stage('3. Push to Docker Hub') {
            steps {
                echo 'Logging in and pushing image to Docker Hub...'
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin"
                    sh "docker push ${DOCKER_IMAGE}"
                }
            }
        }

        stage('4. Deploy on Server') {
            steps {
                echo 'Updating service on Ubuntu server...'
                dir("${DEPLOY_PATH}") {
                    sh "docker compose pull node-api"
                    sh "docker compose up -d"
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check build logs.'
        }
    }
}