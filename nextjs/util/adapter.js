export default function PostgresAdapter(client, options = {}) {
  return {
    async createUser(user) {
      try {
        const sql = `
          INSERT INTO users (name, email, email_verified, image, mobile) 
          VALUES ($1, $2, $3, $4, $5) 
          RETURNING id, name, email, email_verified, image, mobile`;
        let result = await client.query(sql, [
          user.name,
          user.email,
          user.emailVerified,
          user.image,
          user.mobile,
        ]);
        return result.rows[0];
      } catch (err) {
        console.log(err);
        return;
      }
    },
    async getUser(id) {
      try {
        const sql = `select * from users where id = $1`;
        let result = await client.query(sql, [id]);
        return result.rows[0];
      } catch (err) {
        console.log(err);
        return;
      }
    },
    async getUserByEmail(email) {
      try {
        const sql = `select * from users where email = $1`;
        let result = await client.query(sql, [email]);
        return result.rows[0];
      } catch (err) {
        console.log(err);
        return;
      }
    },
    async getUserByAccount({ providerAccountId, provider }) {
      try {
        const sql = `
            select u.* from users u join accounts a on u.id = a.user_id 
            where 
            a.provider = $1 
            and 
            a.provider_account_id = $2`;

        const result = await client.query(sql, [provider, providerAccountId]);
        return result.rows[0];
      } catch (err) {
        console.log(err);
      }
    },
    async updateUser(user) {
      try {
      } catch (err) {
        console.log(err);
        return;
      }
    },
    async linkAccount(account) {
      try {
        const sql = `
          insert into accounts 
          (
            provider, 
            type, 
            provider_account_id, 
            access_token,
            refresh_token,
            token_type,
            user_id
          )
          values ($1, $2, $3, $4, $5, $6, $7)`;

        const params = [
          account.provider,
          account.type,
          account.providerAccountId,
          account.access_token,
          account.refresh_token,
          account.token_type,
          account.userId,
        ];

        await client.query(sql, params);
        return account;
      } catch (err) {
        console.log(err);
        return;
      }
    },
    async createSession({ sessionToken, userId, expires }) {
      console.log("this is createSession");

      try {
        const sql = `insert into sessions (user_id, expires, session_token) values ($1, $2, $3)`;
        await client.query(sql, [userId, expires, sessionToken]);
        return { sessionToken, userId, expires };
      } catch (err) {
        console.log(err);
        return;
      }
    },
    async getSessionAndUser(sessionToken) {
      console.log("this is getSessionAndUser");

      try {
        let result;
        result = await client.query(
          "select * from sessions where session_token = $1",
          [sessionToken]
        );

        let session = result.rows[0];

        result = await client.query("select * from users where id = $1", [
          session.userId,
        ]);
        let user = result.rows[0];

        return {
          session,
          user,
        };
      } catch (err) {
        console.log(err);
        return;
      }
    },
    async updateSession({ sessionToken }) {
      console.log("updateSession", sessionToken);
      return;
    },
    async deleteSession(sessionToken) {
      console.log("this is deleteSession");
      try {
        const sql = `delete from sessions where session_token = $1`;
        await client.query(sql, [sessionToken]);
      } catch (err) {
        console.log(err);
        return;
      }
    },
  };
}
