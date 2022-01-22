use redis::{
  Client, ConnectionAddr, ConnectionInfo, IntoConnectionInfo, RedisConnectionInfo, RedisResult,
};
use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Serialize, Deserialize, Debug, TS)]
#[ts(export)]
pub struct RedisConnection {
  name: String,
}

impl IntoConnectionInfo for RedisConnection {
  fn into_connection_info(self) -> RedisResult<ConnectionInfo> {
    println!("{:?}", self);

    Ok(ConnectionInfo {
      addr: ConnectionAddr::Tcp("127.0.0.1".to_string(), 6379),
      redis: RedisConnectionInfo {
        db: 0,
        username: None,
        password: None,
      },
    })
  }
}

#[tauri::command]
pub fn test_connection(connection_info: RedisConnection) -> Result<String, String> {
  let connection = Client::open(connection_info);
  match connection {
    Ok(client) => match client.get_connection() {
      Ok(_) => Ok("Connected".into()),
      Err(_) => Err("Failed to get connection".into()),
    },
    Err(_) => Err("Failed to connect".into()),
  }
}
