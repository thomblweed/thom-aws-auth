output "source_file" {
  description = "name of the output"
  value       = data.archive_file.zip_file.source_file
}

output "output_path" {
  description = "path to the output file"
  value       = data.archive_file.zip_file.output_path
}

output "output_base64sha256" {
  description = "base64 encoded sha256 hash of the output"
  value       = data.archive_file.zip_file.output_base64sha256
}
