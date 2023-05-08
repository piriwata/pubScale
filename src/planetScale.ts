import { createConnection } from "mysql2/promise";
import { TFile } from "obsidian";

export interface planetScaleClient {
  insertPost: (file: TFile) => Promise<string | undefined>;
  deletePost: (file: TFile) => Promise<string | undefined>;
}

export interface planetScaleClientConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port?: number;
  ssl?: boolean;
}

export async function createPlanetScaleClient(
  config: planetScaleClientConfig
): Promise<planetScaleClient> {
  const connection = await createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port,
    ssl: { rejectUnauthorized: config.ssl || false },
  });

  return {
    async insertPost(file: TFile) {
      try {
        const content = await file.vault.read(file);
        console.log(typeof content);
        await connection.execute(
          "INSERT INTO posts (slug, content) VALUES (?, ?) ON DUPLICATE KEY UPDATE content = ?",
          [file.basename, content, content]
        );
      } catch (e) {
        console.error(e);
        return e.message;
      }
    },
    async deletePost(file: TFile) {
      try {
        await connection.execute("DELETE FROM posts WHERE slug = ?", [
          file.basename,
        ]);
      } catch (e) {
        console.error(e);
        return e.message;
      }
    },
  };
}
