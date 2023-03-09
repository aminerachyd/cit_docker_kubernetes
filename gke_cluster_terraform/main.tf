resource "google_container_cluster" "gke_cluster" {
  name               = var.cluster_name
  location           = var.zone
  initial_node_count = var.node_count
  node_config {
    machine_type = var.machine_type
    disk_size_gb = 100
  }
}
