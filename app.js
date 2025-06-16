const Koa = require("koa");
const Router = require("@koa/router");
const bodyParser = require("koa-bodyparser");
const { pool, initDb } = require("./db/db");

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3000;

// 使用中间件
app.use(bodyParser());
// 初始化数据库
initDb();
router.get("/", (ctx) => {
  ctx.body = { message: "Hello from Docker Koa with MySQL!" };
});

router.post("/users/add", async (ctx) => {
  try {
    const { account, password } = ctx.request.body;
    if (!account || !password) {
      ctx.status = 400;
      ctx.body = { error: "account and password are required" };
      return;
    }
    const [result] = await pool.execute(
      "INSERT INTO users (account, password) VALUES (?, ?)",
      [account, password]
    );
    ctx.status = 201;
    ctx.body = {
      id: result.insertId,
      account,
      password,
      message: "User created successfully",
    };
  } catch (error) {
    console.error("Error creating user:", error);
    ctx.status = 500;
    ctx.body = { error: "Internal Server Error" };
  }
});

// 获取所有用户
router.get("/users", async (ctx) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    ctx.body = rows;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

// 获取单个用户
router.get("/users/:id", async (ctx) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [
      ctx.params.id,
    ]);

    if (rows.length === 0) {
      ctx.status = 404;
      ctx.body = { error: "User not found" };
      return;
    }

    ctx.body = rows[0];
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
