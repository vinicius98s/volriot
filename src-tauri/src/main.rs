#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod error;
mod redis;
mod storage;
use crate::redis::test_connection;
use crate::storage::{read_data, write_data, StoragePath};
use tauri_plugin_window_state::WindowState;

fn main() {
  tauri::Builder::default()
    .manage(StoragePath("Volriot".into()))
    .plugin(WindowState::default())
    .invoke_handler(tauri::generate_handler![
      test_connection,
      write_data,
      read_data
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
