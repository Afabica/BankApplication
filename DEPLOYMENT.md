# Deployment of application on kubernetes cluster locally.

`docker login` - authorization
`docker apply -f myapp-backend .` - containerize backend application
`docker apply -f myapp-frontend .` containerize frontend application
`docker tag myapp-backend my-docker-username/myapp-backend:v1` - tag the image with your Docker Hub username.
`docker push my-dockerhub-username/myapp-backend:v1` - pushing the correctly tagged image.

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

Example of deploying everyhing with use of docker compose

## Minikube 

### minikube tunnel does
- Assings an External Ip to LoadBalancer services.
- Routes traffic to services via your machine's network 
- Runs a local process that keeps the tunnel open.
- If using Minikube, `EXTERNAL-IP` will always be None because Minikube doesn't provision cloud LoadBalancers.

