import {
	App,
	ButtonComponent,
	Notice,
	PluginSettingTab,
	Setting,
} from "obsidian";
import PubScalePlugin from "../main";

export class PubScaleSettingTab extends PluginSettingTab {
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

		const buttonContainer = containerEl.createEl("div");
		buttonContainer.setAttrs({
			align: "right",
			style: "margin-bottom: 16px",
		});

		// Test connection
		new ButtonComponent(buttonContainer)
			.setButtonText("Test connection")
			.onClick(async () => {
				try {
					await this.plugin.createClient();
					new Notice("Successfully connected to database.");
				} catch (e) {
					new Notice(`Failed to connect to database: ${e}`);
				}
			});

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
