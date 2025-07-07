#!/usr/bin/env bash

set -e  # Exit immediately if any command fails

working_dir=$(pwd)

echo "📦 Current list of namespaces on the Kubernetes cluster:"
kubectl get namespaces | grep -v NAME | awk '{print $1}'
echo

tenant="$1"
if [ -z "$tenant" ]; then
    read -rp "Enter the name of the new tenant (namespace): " tenant
fi

echo "🔍 Checking if namespace '$tenant' already exists..."
if kubectl get namespace "$tenant" >/dev/null 2>&1; then
    echo "⚠️  Namespace '$tenant' already exists. Please choose a unique name."
    echo "Current list of namespaces:"
    sleep 2
    kubectl get namespaces | grep -v NAME | awk '{print $1}'
    exit 1
fi

echo
echo "🚀 Creating Namespace: $tenant"
kubectl create namespace "$tenant"
echo "✅ Namespace '$tenant' has been created."
echo

echo "🔐 Creating TLS secret in namespace: $tenant"
# Use mkcert-friendly filenames if available
if [[ -f myapp.local.pem && -f myapp.local-key.pem ]]; then
    cert_file="myapp.local.pem"
    key_file="myapp.local-key.pem"
elif [[ -f tls-certificate.crt && -f private-key-decrypted.pem ]]; then
    cert_file="tls-certificate.crt"
    key_file="private-key-decrypted.pem"
else
    echo "❌ TLS certificate or key file not found."
    echo "Ensure either 'myapp.local.pem' + 'myapp.local-key.pem' or 'tls-certificate.crt' + 'private-key-decrypted.pem' exist in $working_dir."
    exit 1
fi

kubectl create secret tls my-tls-secret \
  --cert="$cert_file" \
  --key="$key_file" \
  --namespace="$tenant"
echo "✅ TLS secret 'my-tls-secret' created in namespace '$tenant'."
echo

echo "🖥️  Counting available worker nodes:"
nodes=$(kubectl get nodes --no-headers | wc -l)
echo "✅ Number of worker nodes on this cluster: $nodes"
echo

echo "🧩 Deploying Application Backend and Frontend..."
kubectl apply -n "$tenant" -f "$working_dir/backend-deploy.yaml"
kubectl apply -n "$tenant" -f "$working_dir/frontend-deploy.yaml"
kubectl apply -n "$tenant" -f "$working_dir/backend-svc.yaml"
kubectl apply -n "$tenant" -f "$working_dir/frontend-svc.yaml"
echo "✅ Application services deployed."

echo "🌐 Deploying NGINX Ingress or Proxy..."
kubectl apply -n "$tenant" -f "$working_dir/nginx-deployment.yaml"
kubectl apply -n "$tenant" -f "$working_dir/nginx-configmap.yaml"
kubectl apply -n "$tenant" -f "$working_dir/nginx-svc.yaml"

# Optionally deploy Ingress resource if available
if [[ -f "$working_dir/nginx-ingress.yaml" ]]; then
    kubectl apply -n "$tenant" -f "$working_dir/nginx-ingress.yaml"
    echo "✅ NGINX Ingress deployed."
fi

echo "✅ NGINX configuration deployed."
echo

echo "📋 Final printout of Kubernetes objects in namespace '$tenant':"
kubectl get all -n "$tenant"

echo "💾 Exporting tenant name to file..."
echo "namespace=$tenant" > "$working_dir/tenant_export"
echo "✅ Done!"

