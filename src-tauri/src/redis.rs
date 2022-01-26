use redis::{
  Client, ConnectionAddr, ConnectionInfo, IntoConnectionInfo, RedisConnectionInfo, RedisResult,
};
use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Serialize, Deserialize, Debug, TS)]
#[ts(export)]
pub struct RedisConnection {
  host: String,
  port: u16,
  db: Option<i64>,
  username: Option<String>,
  password: Option<String>,
}

impl IntoConnectionInfo for RedisConnection {
  fn into_connection_info(self) -> RedisResult<ConnectionInfo> {
    Ok(ConnectionInfo {
      addr: ConnectionAddr::Tcp(self.host, self.port),
      redis: RedisConnectionInfo {
        db: match self.db {
          Some(database) => database,
          None => 0,
        },
        username: self.username,
        password: self.password,
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
