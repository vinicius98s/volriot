use crate::error::Error;
use serde_json::Value as JsonValue;
use std::fs::{create_dir_all, read, write};
use std::path::PathBuf;
use tauri::api::path::local_data_dir;

pub struct StoragePath(pub PathBuf);

impl StoragePath {
  fn storage_path(&self) -> PathBuf {
    local_data_dir()
      .expect("failed to resolve app dir")
      .join(&self.0)
  }
}

#[derive(serde::Serialize, Debug)]
pub struct StorageData {
  pub data: serde_json::Value,
  pub status: bool,
}

#[tauri::command]
pub fn write_data(
  state: tauri::State<StoragePath>,
  key: String,
  value: JsonValue,
) -> Result<(), Error> {
  let storage_path = state.storage_path();

  create_dir_all(storage_path)?;

  let parsed_data = &serde_json::to_string(&value)?;
  let data = bincode::serialize(parsed_data)?;
  Ok(write(state.storage_path().join(key), &data)?)
}

#[tauri::command]
pub fn read_data(state: tauri::State<StoragePath>, key: String) -> Result<JsonValue, Error> {
  let result = read(state.storage_path().join(key))?;
  let data = bincode::deserialize::<String>(&result)?;

  Ok(serde_json::from_str(&data)?)
}
