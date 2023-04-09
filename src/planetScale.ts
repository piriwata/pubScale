import {
	createConnection,
	ConnectionOptions,
	ResultSetHeader,
	FieldPacket,
} from "mysql2/promise";
import { TFile } from "obsidian";

export interface planetScaleClient {
	insertPost: (file: TFile) => Promise<string | undefined>;
	deletePost: (file: TFile) => Promise<string | undefined>;
}

export interface planetScaleClientConfig extends ConnectionOptions {}

export async function createPlanetScaleClient(
	config: planetScaleClientConfig
): Promise<planetScaleClient> {
	const connection = await createConnection({
		ssl: { rejectUnauthorized: false },
		...config,
	});

	return {
		async insertPost(file: TFile) {
			try {
				const content = await file.vault.read(file);
				console.log(typeof content);
				const [response, _]: [ResultSetHeader, FieldPacket[]] =
					await connection.execute(
						"INSERT INTO posts (title, content) VALUES (?, ?) ON DUPLICATE KEY UPDATE content = ?",
						[file.basename, content, content]
					);
			} catch (e) {
				console.error(e);
				return e.message;
			}
		},
		async deletePost(file: TFile) {
			try {
				const [response, _]: [ResultSetHeader, FieldPacket[]] =
					await connection.execute(
						"DELETE FROM posts WHERE title = ?",
						[file.basename]
					);
			} catch (e) {
				console.error(e);
				return e.message;
			}
		},
	};
}
