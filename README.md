# Lecture about Docker and Kubernetes for the CIT INPT club

This lecture is intended as a general introduction about Docker and Kubernetes and **is in no way a complete guide to the subject**. It it acts as a showcase to what is possible to achieve with these technologies.

You will need [Docker](https://www.docker.com/products/docker-desktop) and [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) installed

Slides available [here](https://docs.google.com/presentation/d/11uHk67KspMAkXE_bnRBfwzrP3WqTBzsz4OSjvoVevHQ/edit?usp=sharing)

## Demo 1 - Discovering Docker

Taking a small NodeJS server and packaging it as a Docker container, then running it locally.

To build and run the Docker container:

```bash
cd demo1
docker build -t node-server .
docker run --rm -it -p 8080:8080 node-server
```

Then go to [http://localhost:8080](http://localhost:8080) to see the server running.

You can kill the container by running `docker ps` to get the container ID and then `docker kill <container ID>`.

## Demo 2 - Launch multiple services with Docker

The application is composed of a frontend and two backend services, the backend services provide mock data

The backend services both bind to the same port on localhost (8080) so they can't be run at the same time.

Instead we package them as a Docker container. Each containers acts as a _small_ virtual machine, with its own filesystem and **network stack**.
We can map internal ports of the container to external ports of the host machine. This way we can run multiple containers regardless of the ports they use.

The table resumes the different services and the ports they use:

| Service  | Written in | Internal port (Container)                 | External port (Host) |
| -------- | ---------- | ----------------------------------------- | -------------------- |
| Frontend | JS (React) | 80 (result after running `npm run build`) | 8080                 |
| News     | Rust       | 8080                                      | 8081                 |
| Weather  | Go         | 8080                                      | 8082                 |

To launch the application:

```bash
cd demo2
./launch-containers.sh
```

With `docker` comes also `docker-compose`, which is a tool to manage multiple containers at once. We can choose to launch containers this way too.  
The file `docker-compose.yml` contains the configuration for the containers.

To launch the application using `docker-compose`:

```bash
docker-compose up
```

You can delete the containers by running `docker-compose down`.

## Demo 3 - Playing around with Kubernetes

**The Kubernetes cluster used here is provisioned on Google Cloud.**

You can setup a local cluster **for testing purposes** using [Docker Desktop](https://docs.docker.com/desktop/kubernetes/), [Minikube](https://minikube.sigs.k8s.io/docs/start/) or [Kind](https://kind.sigs.k8s.io/docs/user/quick-start/).

To provision the cluster on Google Cloud, either use the Google Cloud Console, or use the Terraform script provided in `demo3/gke_cluster_terraform`.

The script will create a managed cluster with 5 nodes (4 CPU/16 RAM), uses about 1$ per hour.

To deploy the application on the cluster, first deploy the backend services:

```bash
cd demo3
kubectl apply -f namespace.yaml
kubectl config set-context --current --namespace=cit-inpt
kubectl apply -f news.yaml && kubectl apply -f weather.yaml
```

The backends are exposed via LoadBalancer services, which will create a public IP address for each service.

After waiting a few seconds, you can get the public IP addresses of the services by running:

```bash
kubectl get services
```

Take the `EXTERNAL-IP` of each service and replace the lines 34 and 36 in `frontend.yaml` with the correct IPs and ports.

Then deploy the frontend:

```bash
kubectl apply -f frontend.yaml
```

The frontend is also visible via a LoadBalancer service, after waiting a few seconds you can its public IP address by running:

```bash
kubectl get services | grep frontend
```

To delete the application, simply delete the namespace:

```bash
kubectl delete -f namespace.yaml
```
