#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod error;
mod redis;
use crate::redis::test_connection;
use tauri_plugin_window_state::WindowState;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      test_connection,
    ])
    .plugin(WindowState::default())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
