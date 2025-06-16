const mysql = require("mysql2/promise");

// 创建连接池
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "koadb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 5,
});

// 初始化数据库，创建表
async function initDb() {
  let connection;
  let retries = 10; // 最多重试10次
  let connected = false;
  while (retries > 0 && !connected) {
    try {
      connection = await pool.getConnection();
      connected = true;
      console.log("Connected to MySQL database!");

      // 创建用户表
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          account VARCHAR(255) NOT NULL UNIQUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          password VARCHAR(255) NOT NULL,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);

      console.log("Database tables initialized!");
    } catch (error) {
      retries--;
      console.log(`Failed to connect to MySQL. Retries left: ${retries}`);
      if (retries === 0) {
        console.error("Database initialization error:", error);
        throw error;
      }
      // 等待5秒后重试
      await new Promise((resolve) => setTimeout(resolve, 5000));
    } finally {
      if (connection) {
        connection.release(); // 确保在任何情况下都释放连接
      }
    }
  }
}

// 导出连接池和初始化函数
module.exports = {
  pool,
  initDb,
};
