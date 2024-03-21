import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, TFile } from 'obsidian';
import { addProperties, addPropToSet, removeProperties } from "./properties";

// Remember to rename these classes and interfaces!

export interface NewPropData {
	type: string;
	data: string | string[];
	overwrite: boolean;
}

interface todoProgressSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: todoProgressSettings = {
	mySetting: 'default'
}

export default class todoProgress extends Plugin {
	settings: todoProgressSettings;

	async onload() {
		await this.loadSettings();

		console.log('Loading plugin')

		this.addCommand({
			id: "add-progress-tracking",
			name: "Add progress tracking to this note",
			callback: () => {
				console.log("Progress tracking added") //TODO:add actuall tracking
			}
		})

		this.addCommand({
			id: 'test-add-prop',
			name: 'Test add property',
			callback: () => {
				const activeFile = this.app.workspace.getActiveFile();
				if (activeFile) {
					const propData: NewPropData = {
						type: 'string',
						data: 'testData',
						overwrite: false,
					}
					addProperties(this.app, activeFile, new Map([['tags', propData]]), false);
				} else {
					console.log("No active file to add properties to.");
				}
			}
		});
	}

	onunload() {
		console.log('Unloading plugin')
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

}
