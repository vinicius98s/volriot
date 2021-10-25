#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

extern crate redis;
use redis::{Commands, RedisResult};

#[tauri::command]
fn fetch_an_integer(value: i32) -> Result<i32, String> {
    let client = redis::Client::open("redis://127.0.0.1/").unwrap();
    let mut con = client.get_connection().unwrap();
    let _: RedisResult<()> = con.set("my_key", value);

    let value: RedisResult<i32> = con.get("my_key");
    match value {
        Ok(r) => Ok(r),
        Err(_) => Err("error".into())
    }
}

fn main() {
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![fetch_an_integer])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
