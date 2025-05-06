#!/bin/bash -e

# ================================
# CONFIGURATION
# ================================

# Set DockerHub user (or your registry)
DOCKER_USER="afabica234"

# Set the image version tag (CHANGE THIS IF NEEDED)
VERSION_TAG="v8"

# ================================
# FUNCTIONS
# ================================

# Check if an image was built successfully
check_image_exists() {
  local image=$1
  if [[ "$(docker images -q $image 2> /dev/null)" == "" ]]; then
    echo "❌ Error: $image image was not built successfully."
    exit 1
  else
    echo "✅ $image image built successfully."
  fi
}

# Build, check, and push a Docker image
build_and_push() {
  local component=$1
  local dockerfile=$2

  echo "🚀 Building ${component}:${VERSION_TAG} image..."
  docker build --tag="${DOCKER_USER}/${component}:${VERSION_TAG}" -f "${dockerfile}" .

  check_image_exists "${DOCKER_USER}/${component}:${VERSION_TAG}"

  echo "📤 Pushing ${component}:${VERSION_TAG} image..."
  docker push "${DOCKER_USER}/${component}:${VERSION_TAG}"
}


# ================================
# MAIN BUILD STEPS
# ================================

build_and_push "jmeter-base" "Dockerfile-base"
build_and_push "jmeter-master" "Dockerfile-master"
build_and_push "jmeter-slave" "Dockerfile-slave"

# If you have a reporter image, uncomment below:
# build_and_push "jmeter-reporter" "Dockerfile-reporter"

echo "🏁 All images built and pushed successfully!"

