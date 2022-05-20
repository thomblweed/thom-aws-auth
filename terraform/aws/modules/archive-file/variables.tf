variable "source_file" {
  description = "path to the source file"
  type        = string
}

variable "output_path" {
  description = "path to the output file"
  type        = string
  nullable    = false
}

variable "source_directory" {
  description = "path to the source directory"
  type        = string
}
