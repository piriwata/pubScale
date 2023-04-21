import { Notice, Plugin, TFile } from "obsidian";
import { createPlanetScaleClient } from "./src/planetScale";
import { PubScaleSettingTab } from "./src/setting";

const DEFAULT_SETTINGS = {
	username: "",
	password: "",
	hostUrl: "",
	database: "",
};

export default class PubScalePlugin extends Plugin {
	settings = DEFAULT_SETTINGS;

	async onload() {
		this.settings = (await this.loadData()) || DEFAULT_SETTINGS;

		this.addCommand({
			id: "action.publish",
			name: "Publish an active note to PlanetScale",
			editorCheckCallback: (checking, editor, ctx) => {
				if (checking) {
					return ctx.file !== null;
				}
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				this.insertToPlanetScale(ctx.file!);
			},
		});
		this.addCommand({
			id: "action.delete",
			name: "Delete an active note from PlanetScale",
			editorCheckCallback: (checking, editor, ctx) => {
				if (checking) {
					return ctx.file !== null;
				}
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				this.deleteFromPlanetScale(ctx.file!);
			},
		});

		this.addSettingTab(new PubScaleSettingTab(this.app, this));
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async insertToPlanetScale(file: TFile) {
		const title = file.basename;
		new Notice(`Publishing... "${title}"`);
		const client = await createPlanetScaleClient({
			user: this.settings.username,
			password: this.settings.password,
			host: this.settings.hostUrl,
			database: this.settings.database,
		});
		const error = await client.insertPost(file);

		if (error) {
			new Notice(`Failed to publish "${title}" due to: ${error}`);
			return;
		}
		new Notice(`Published "${title}"`);
	}

	async deleteFromPlanetScale(file: TFile) {
		const title = file.basename;
		new Notice(`Deleting... "${title}"`);
		const client = await createPlanetScaleClient({
			user: this.settings.username,
			password: this.settings.password,
			host: this.settings.hostUrl,
			database: this.settings.database,
		});
		const error = await client.deletePost(file);

		if (error) {
			new Notice(`Failed to delete "${title}" due to: ${error}`);
			return;
		}
		new Notice(`Deleted "${title}"`);
	}
}
