export default function PostgresAdapter(client, options = {}) {
  return {
    async createUser(user) {
      try {
        // user.id = user._id;
        user.emailVerified = user.email_verified;

        const sql = `
          INSERT INTO users (id, name, email, email_verified, image, mobile) 
          VALUES ($1, $2, $3, $4, $5, $6) 
          RETURNING id, name, email, email_verified, image, mobile`;
        let result = await client.query(sql, [
          user.id,
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
            user_id, 
            type, 
            provider, 
            provider_account_id, 
            refresh_token,
            access_token,
            expires_at,
            token_type
          )
          values ($1, $2, $3, $4, $5, $6, $7, $8)`;

        const params = [
          account.userId,
          account.type,
          account.provider,
          account.providerAccountId,
          account.refresh_token,
          account.access_token,
          account.expires_at,
          account.token_type,
        ];

        await client.query(sql, params);
        return account;
      } catch (err) {
        console.log(err);
        return;
      }
    },
    async createSession({ sessionToken, userId, expires }) {
      console.log(sessionToken);

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
      try {
        let result;
        result = await client.query(
          "select * from sessions where session_token = $1",
          [sessionToken]
        );

        let session = result.rows[0];

        result = await client.query("select * from users where id = $1", [
          session.user_id,
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
