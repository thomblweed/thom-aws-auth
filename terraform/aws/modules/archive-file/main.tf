data "archive_file" "zip_file" {
  type        = "zip"
  source_dir  = var.source_directory
  source_file = var.source_file
  output_path = var.output_path
}
