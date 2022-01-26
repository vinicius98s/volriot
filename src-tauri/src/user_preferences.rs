use crate::error::Error;
use serde::{Deserialize, Serialize};
use std::fs::{write, OpenOptions};
use std::io::{Read, Write};
use std::path::PathBuf;
use tauri::api::path::local_data_dir;
use ts_rs::TS;

#[derive(Serialize, Deserialize, TS, Debug)]
#[serde(rename_all = "lowercase")]
#[ts(export)]
enum Theme {
  Light,
  Dark,
}

#[derive(Serialize, Deserialize, TS, Debug)]
#[ts(export)]
pub struct UserPreferences {
  theme: Theme,
}

impl UserPreferences {
  fn default() -> Self {
    Self {
      theme: Theme::Light,
    }
  }
}

fn get_storage_path() -> PathBuf {
  local_data_dir()
    .expect("failed to load data dir")
    .join(".volriot.settings")
}

#[tauri::command]
pub fn get_user_preferences() -> Result<UserPreferences, Error> {
  let path = get_storage_path();
  let mut file = OpenOptions::new()
    .read(true)
    .write(true)
    .create(true)
    .open(path)?;

  let mut buf = vec![];
  file.read(&mut buf)?;

  if buf.is_empty() {
    let default_preferences = UserPreferences::default();
    let data = bincode::serialize::<String>(&serde_json::to_string(&default_preferences)?)?;
    file.write_all(&data[..])?;

    return Ok(default_preferences);
  }

  let data = bincode::deserialize::<String>(&buf)?;

  Ok(serde_json::from_str(&data)?)
}

#[tauri::command]
pub fn save_user_preferences(preferences: UserPreferences) -> Result<(), Error> {
  let path = get_storage_path();
  println!("saving: {:?}", preferences);

  let parsed_data = serde_json::to_string(&preferences)?;
  let data = bincode::serialize(&parsed_data)?;
  Ok(write(path, &data)?)
}
