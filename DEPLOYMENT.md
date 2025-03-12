# Deployment of application on kubernetes cluster locally.

`docker login` - authorization
`docker apply -f myapp-backend .` - containerize backend application
`docker apply -f myapp-frontend .` containerize frontend application
`docker tag myapp-backend my-docker-username/myapp-backend:v1` - tag the image with your Docker Hub username.
`docker push my-dockerhub-username/myapp-backend:v1` - pushing the correctly tagged image.

## Process of containerizing and pushing

`docker build -t afabica234/myapp-backend:latest`
`docker tag afabica234/myapp-backend afabica234/myapp-backend:latest`
Or
`docker tag afabica234/myapp-backend:latest afabica234/myapp:latest`
`docker push afabica234/myapp-backend:latest` - push to docker registry
`docker pull afabica234/myapp-backend:latest`

Also possible automate process with use of:

- GitHub ACtions or CI/CD tools to automate the build and push process.
- Docker Hub Automated Builds that trigger builds on git push.

# Deployment of application on kubernetes clluster of Azure.

`az login` - login into Azure.
`az acr list --output table` - check your existing registrires.
`az acr create --resource-group myResourceGroup --name myACR --sku Basic`
Then:
`az acr login --name myACR`- authenticate docker with Azure
Then:
`az acr show --name myACR --query loginServer --output tsv` - find your Azure Container Registry login server.
`docker tag myapp-backend myacr.azurecr.io/myapp-backend:v1` - tag your docker image to match Azure ACR.
`docker push myacr.azurecr.io/myapp-backend:v1` - push the image to ACR.
`az acr repository list --name myACR --output table`
`az acr repository show-tags --name myACR --repository myapp-backend --output table` - for output tags

# Pull secret with Kubernetes

`kubectl create secret docker-registry acr-secret \
    --docker-server=myacr.azure.io \
    --docker-username=<your-azure-username> \
    --docker-password=<your-azr-password \
    --namespace=default `

# Starting deployment

`kubectl apply -f deployment.yaml`
`kubectl apply -f service.yaml`

# Creating namespace

`kubectl create namespace my-app`

# Finding out of deployment name

`kubectl get deployments` - this give you the deployments currently in use

# Delete Any Broken DEployments

`kubectl delete deployment dontend-deployment --ignore-not-found=true`
`kubectl delete service frontnd-service --ignore-not-found-true`

# Delete from namespace or entire

`kubectl delete svc <service-name> -n my-app`
`kubectt delete `

# Check if it was successfully

    kubectl get deployments --namespac=default
    kubectl get pods --namespace=default
    kubectl get services --namespace=default

# Using Azure Container Registry (ACR)

`If you are using ACR, find the resource group by running`:
<mark>
az acr list --query "[].{name:name, resourceGroup:resourceGroup}" --output table
</mark>

`Run the following command to list all resource groups in your subscription`:
az group list --query "[].{name:name}" --output table

## Kubernetes secrets

`kubectl get secrets --all-namespaces`

## Kubernetes services

`ClusterIP` - This is the default service type. It assigns an internal IP address to the service, making it accessible only within the cluster. It is used for internal communications between workloads.
`NodePort` - This type exposes the service on a sttic port of each node, allowing external access to the sevice through the node's IP address and the specified port. It is suitable for accessing workloads outside the cluster, especially for one-off or deployment use.
`LoadBalancer` - This service type provisions a load balancer in the cloud environment, forwarding traffic to the nodes running the service. It is ideal for publicly accessible web apps and APIs in production environments, handling high trafffic volumes.
`ExternalName` - This type maps the service to a DNS name instead of a selector, decoupling workloads from direct dependencies on external service URLs.
`Headless` - This service type does not assing a cluster IP and is useful for advanced custom networking that avoids automatic Kubernetes proxying. It enables DNS resolution of the POD IPs behind the Service.

# Make changes with deployment in azure kubernetes cluster.

`kubectl exec -it deployment-name -- /bin/sh | /bin/bash`
`vi /app/config.json` - for modifying files in deployment.
`kubectl edit deployment backend-deployment` - this opens the deployment YAML in text editor
After modifying it should be applied
`kubectl apply -f backend-deployment.yaml`
`kubectl rollout resrtart deployment backend-deployment` - to restart the deployment and apply changes

# Setting up Prometheus (for metrics collection)

<mark>

sudo pacman -S helm
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm install prometheus prometheus-community/kube-prometheus-stack

this installs:

- Promeheus Server (scrapes metrics)
- Alertmanger (alerts based on thresholds)
- Grafana (dashboard visualization)
- Node Explorer (collects system metrics)

`kubectl get pods -n monitoring` - for checking the deployment

</mark>

## Configuration of Spring Boot for Promehteus

<mark>

management:
endpoints:
web:
exposure:
include: "prometheus"
metrics:
export:
prometheus:
enabled: true
endpoint:
prometheus:
enabled: true

also it is necessary to add the dependency like:
`implementation 'io.micrometer:micrometer-registry-prometheus`
http://localhost:8080/actuator/prometheus

</mark>

## Modifying Prometheus to scrape srpgin boot metrics

<mark>

global:
scrape_interval: 15s

scrape_configs:

- job_name: 'spring-boot-app'
  metrics_path: '/actuator/prometheus'
  static_configs:
  - targets: ['spring-boot-service:8080']

</mark>

## Example of .js monitoring

<mark>

import promClient from 'prom-client';

const httpRequestDurationMicroseconds = new promClient.Histogram({
name: 'http_request_duration_ms',
help: 'Duration of HTTP requests in ms'
labelNames: ['method', 'route', 'status_code'],
buckets: [50, 100, 200, 500, 1000, 2000],
});

export default async function handler(req, res) {
const end = httpRequestDurationMicroseconds.startTimer();

res.on('finish', () => {
end({ method: req.method, route: req.url, status_code: res.statusCode });
});

res.end("Metrics collected");
}

### Expose metrics at

http://localhost:3000/api/metrics

Modification for prometheus to scrape next.js:

- job_name: 'nextjs-app'
  metrics_path: '/api/metrics'
  static_configs:
  - targets: ['nextjs-service:3000']

</mark>

## Data visualization in Grafana

Access Grafana:
kubectl port-forward service/prometheus-grafana 3000:80 -n monitoring
Is possible to use Pre-built dashboards in Dashboards > Import

Example of deploying everything with use of docker compose

## Minikube

### minikube tunnel does

- Assings an External Ip to LoadBalancer services.
- Routes traffic to services via your machine's network
- Runs a local process that keeps the tunnel open.
- If using Minikube, `EXTERNAL-IP` will always be None because Minikube doesn't provision cloud LoadBalancers.

# Configuration with Prometheus and Grafana

## Spring Boot configuration.

<mark>

<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

`Enable Metrics in application.yml`:

management:
endpoints:
web:
exposure:
include: health, prometheus
metrics:
export:
prometheus:
enabled: true
endpoint:
health:
show-details: always

</mark>

## Next.js Configuration.

`npm install prom-client`

<mark>

import { NextApiRequest, NextApiResponse } from 'next';
import client from 'prom-client';

const register = new client.Registry();
client.collectDefaultMetrics({ register });

export default function handler(req: NextApiRequest, res: NextApiResponse) {
res.setHeader('Content-Type', register.contentType);
res.send(register.metrics());
}

</mark>

## Deploy to Kubernetes.

### Prometheus config.

<mark>

global:
scrape_interval: 15s

scrape_configs:

- job_name: 'spring-boot'
  metrics_path: '/actuator/prometheus'
  static_configs:

  - targets: ['spring-boot-service:8080']

- job_name: 'nextjs'
  metrics_path: '/api/metrics'
  static_configs:
  - targets: ['nextjs-service:3000']

</mark>

### Deploy Prometheus

<mark>

apiVersion: apps/v1
kind: Deployment
metadata:
name: prometheus
spec:
replicas: 1
selector:
matchLabels:
app: prometheus
template:
metadata:
labels:
app: prometheus
spec:
containers: - name: prometheus
image: prom/prometheus
args: - "--config.file=/etc/prometheus/prometheus.yml"
ports: - containerPort: 9090
volumeMounts: - name: prometheus-config
mountPath: /etc/prometheus
volumes: - name: prometheus-config
configMap:
name: prometheus-config

---

apiVersion: v1
kind: Service
metadata:
name: prometheus
spec:
selector:
app: prometheus
ports: - protocol: TCP
port: 9090
targetPort: 9090

</mark>

### Deploy Grafana.

<mark>

apiVersion: apps/v1
kind: Deployment
metadata:
name: grafana
spec:
replicas: 1
selector:
matchLabels:
app: grafana
template:
metadata:
labels:
app: grafana
spec:
containers: - name: grafana
image: grafana/grafana
ports: - containerPort: 3000

---

apiVersion: v1
kind: Service
metadata:
name: grafana
spec:
selector:
app: grafana
ports: - protocol: TCP
port: 3000
targetPort: 3000

</mark>

### Deploy Spring Boot.

<mark>

apiVersion: apps/v1
kind: Deployment
metadata:
name: spring-boot
spec:
replicas: 1
selector:
matchLabels:
app: spring-boot
template:
metadata:
labels:
app: spring-boot
spec:
containers: - name: spring-boot
image: myrepo/spring-boot-app
ports: - containerPort: 8080

---

apiVersion: v1
kind: Service
metadata:
name: spring-boot-service
spec:
selector:
app: spring-boot
ports: - protocol: TCP
port: 8080
targetPort: 8080

</mark>

### Deploy Next.js

<mark>

apiVersion: apps/v1
kind: Deployment
metadata:
name: nextjs
spec:
replicas: 1
selector:
matchLabels:
app: nextjs
template:
metadata:
labels:
app: nextjs
spec:
containers: - name: nextjs
image: myrepo/nextjs-app
ports: - containerPort: 3000

---

apiVersion: v1
kind: Service
metadata:
name: nextjs-service
spec:
selector:
app: nextjs
ports: - protocol: TCP
port: 3000
targetPort: 3000

</mark>

## Accessing Prometheus

Once deployed:

Prometheus: kubectl port-forward svc/prometheus 9090:9090 → Visit http://localhost:9090
Grafana: kubectl port-forward svc/grafana 3000:3000 → Visit http://localhost:3000
Default login: admin / admin
Add Prometheus as a data source in Grafana using http://prometheus:9090

## Creating Dashboard in Grafana.

Go to Grafana → Create Dashboard
Add New Panel
Select Prometheus as the data source
Example queries:
For Spring Boot: http_server_requests_seconds_count
For Next.js: process_cpu_user_seconds_total

## Issues handling

### Checking Prometheus Dashboard

`kubectl port-forward -n my-app svc/prometheus-service 9090:9090`
`http://localhost:9090` - open in browser
`up` - metrict is used to indicate whethe a scrape was successful or not. It is set to 1 if the scrape was successful and 0 if it failed. The scrape is considered failed if the target did not return a response was incorrect or incomplete.
`scrape_duration_seconds`
`scrape_samples_scrapped`
`scrape_series_added`

### Frontend doesn't have an external ip address

- If you're using Minikube, run:
  `minikube service frontend-service -n my-app` - this will open it in you browser
  `kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/main/config/manifests/metakkb-native.yaml`

### If running on minikube and external IPs doesn't appear

`minikube tunnel` - This will assign an external IP your LOadBalancer services

# Automate Process with Git Hub Actions

- Build and tag the Docker image.
- Push it to Docker Hub.
- Deploy it to Azure Kubernetes Service (AKS)

By default, AKS cannot pull private images from Docker Hub unless you configure an ImagePullSecret.

So it also necessary to create Docker Hub Secret in Kubernetes by running command:
`kubectl create screte docker-registry docker-hub-secret \
    --docker-server=https://index.docker.io/v1/ \
    --docker-username=your-docker-username \
    --docker-password=your-docker-password \
    --docker-email=your-email@example.com`

In configuration file like .yaml should be then added like like that:
`imagePullSecrets: 
    - name: docker-hub-secret`

And after that operations create git hub action workflow

1. Go to GitHub Repository -> Settings -> Secrets and Variables -> Actions -> New repository Secret.
2. Add these secrets:
   - DOCKER_USERNAME -> Your Docker Hub username.
   - DOCKER_PASSWORD -> Your Docker Hub password or access token.
   - AZURE_CREDENTIALS -> JSON output from az sp create-for-rbac (explained below).
   - AZURE_CONTAINER_REGISTRY ->

## Configure Azure Kubernetes Service

### Install Azure CLI & Kubernetes CLI

Ensure you have Azure CLI and kubectl installed:
`az login`
`az aks install-cli`

#### Create an AKS Cluster

`az group create --name myResourceGroup --location eastus`
`az aks create --resource-group myResourceGroup --name myAKSCluster --node-count 2 --enable-addons monitoring --generate-ssh-keys`

#### Connect to AKS

`az aks get-credentials --resource-group myResourceGroup --name myAKSCluster`
`kubectl get nodes`

### EXpose the Application in AKS

`kubectl expose deployment myapp-deployment --type=LoadBalancer --port=80 --target-port-8080`
`kubectl get services `

# Overview work of Grafana

## In Grafana, add Prometheus as a daa source(e.g, http://<host>:9090)

Create dashboards that display metrics like
Total Login Attempts: Query
`login_attempt_total`
Login Request Duration: Query
`login_duration_seconds`

- For checking metrics shoud be visited `http://localhost:3000/api/metrics` to see the raw metrics output.
- In prometheus verifymetrics (like privious names )
  A dedicated-endpoint: /api/metrics

## Issue with building application
