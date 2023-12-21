# Variable
version=$1
echo $version
region='ap-southeast-1'
account_id=$(aws sts get-caller-identity | jq -r ".Account")

# Login to docker hub
aws ecr get-login-password --region "$region" | docker login --username AWS --password-stdin "$account_id.dkr.ecr.$region.amazonaws.com"

# Build dockerfile
docker build -t u2u/marketplace-fe -f ../Dockerfile ../.

# Push to docker hub
repo_url="$account_id.dkr.ecr.$region.amazonaws.com/marketplace-fe:$version"
docker tag u2u/marketplace-fe:latest "$repo_url"
docker push "$repo_url"
