// File from tauri store plugin: https://github.com/tauri-apps/tauri-plugin-store/blob/dev/src/error.rs
use serde::{Serialize, Serializer};

/// The error types.
#[derive(thiserror::Error, Debug)]
#[non_exhaustive]
pub enum Error {
  /// JSON error.
  #[error(transparent)]
  Json(#[from] serde_json::Error),
  /// Bincode error.
  #[error(transparent)]
  Bincode(#[from] Box<bincode::ErrorKind>),
  /// IO error.
  #[error(transparent)]
  Io(#[from] std::io::Error),
  /// Custom errors
  #[error("{0}")]
  Custom(String),
}

impl Serialize for Error {
  fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
  where
    S: Serializer,
  {
    serializer.serialize_str(self.to_string().as_ref())
  }
}
