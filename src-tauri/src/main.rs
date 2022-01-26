#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod error;
mod redis;
mod user_preferences;
use crate::redis::test_connection;
use crate::user_preferences::{get_user_preferences, save_user_preferences};
use tauri_plugin_window_state::WindowState;

fn main() {
  tauri::Builder::default()
    .plugin(WindowState::default())
    .invoke_handler(tauri::generate_handler![
      test_connection,
      get_user_preferences,
      save_user_preferences,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
