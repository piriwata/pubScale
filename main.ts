import {
	App,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
	TFile,
} from "obsidian";
import { createPlanetScaleClient, planetScaleClient } from "./src/planetScale";

const DEFAULT_SETTINGS = {
	username: "",
	password: "",
	hostUrl: "",
	database: "",
};

export default class PubScalePlugin extends Plugin {
	settings = DEFAULT_SETTINGS;
	client: planetScaleClient | undefined = undefined;

	async onload() {
		await this.loadSettings();

		this.addCommand({
			id: "pubScale.action.publish",
			name: "Publish an active note to PlanetScale",
			editorCallback: (editor, view) => {
				if (view.file === null) {
					new Notice("No active file to publish.");
					return;
				}
				this.insertToPlanetScale(view.file);
			},
		});
		this.addCommand({
			id: "pubScale.action.delete",
			name: "Delete an active note from PlanetScale",
			editorCallback: (editor, view) => {
				if (view.file === null) {
					new Notice("No active file to delete.");
					return;
				}
				this.deleteFromPlanetScale(view.file);
			},
		});

		this.addSettingTab(new PubScaleSettingTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		return (this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		));
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async getClient() {
		if (this.client) {
			return this.client;
		}
		return (this.client = await createPlanetScaleClient({
			user: this.settings.username,
			password: this.settings.password,
			host: this.settings.hostUrl,
			database: this.settings.database,
		}));
	}

	async insertToPlanetScale(file: TFile) {
		const title = file.basename;
		new Notice(`Publishing... "${title}"`);
		const error = await (await this.getClient()).insertPost(file);

		if (error) {
			new Notice(`Failed to publish "${title}" due to: ${error}`);
			return;
		}
		new Notice(`Published "${title}"`);
	}

	async deleteFromPlanetScale(file: TFile) {
		const title = file.basename;
		new Notice(`Deleting... "${title}"`);
		const error = await (await this.getClient()).deletePost(file);

		if (error) {
			new Notice(`Failed to delete "${title}" due to: ${error}`);
			return;
		}
		new Notice(`Deleted "${title}"`);
	}
}

class PubScaleSettingTab extends PluginSettingTab {
	plugin: PubScalePlugin;

	constructor(app: App, plugin: PubScalePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", {
			text: "Settings for access to your database.",
		});
		containerEl.createEl(
			"p",
			{
				text: "See also: ",
			},
			(el) => {
				el.createEl("a", {
					text: "generate-credentials-in-the-planetscale-dashboard",
					href: "https://planetscale.com/docs/tutorials/connect-any-application#generate-credentials-in-the-planetscale-dashboard",
				});
			}
		);

		// Username
		new Setting(containerEl)
			.setName("USERNAME")
			.setDesc("The auto-generated username for the database.")
			.addText((text) =>
				text
					.setPlaceholder("Enter username")
					.setValue(this.plugin.settings.username)
					.onChange(async (value) => {
						this.plugin.settings.username = value;
						await this.plugin.saveSettings();
					})
			);

		// Password
		new Setting(containerEl)
			.setName("PASSWORD")
			.setDesc("The auto-generated password for the database.")
			.addText((text) =>
				text
					.setPlaceholder("Enter password")
					.setValue(this.plugin.settings.password)
					.onChange(async (value) => {
						this.plugin.settings.password = value;
						await this.plugin.saveSettings();
					})
			);

		// Host URL
		new Setting(containerEl)
			.setName("ACCESS HOST URL")
			.setDesc("The host URL for the database.")
			.addText((text) =>
				text
					.setPlaceholder("Enter host URL")
					.setValue(this.plugin.settings.hostUrl)
					.onChange(async (value) => {
						this.plugin.settings.hostUrl = value;
						await this.plugin.saveSettings();
					})
			);

		// Database Name
		new Setting(containerEl)
			.setName("Database")
			.setDesc("The name of the database.")
			.addText((text) =>
				text
					.setPlaceholder("Enter database name")
					.setValue(this.plugin.settings.database)
					.onChange(async (value) => {
						this.plugin.settings.database = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
