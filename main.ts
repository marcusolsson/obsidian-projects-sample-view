import { Plugin } from "obsidian";
import {
	DataQueryResult,
	ProjectView,
	ProjectViewProps,
} from "obsidian-projects-types";

class MySampleView extends ProjectView {
	dataEl?: HTMLElement;

	getViewType(): string {
		return "my-sample-view";
	}

	getDisplayName(): string {
		return "Sample view";
	}

	getIcon(): string {
		return "apple";
	}

	// onData is called whenever the data has been updated (for whatever reason).
	// Whenever this function is called, you should invalidate previous data.
	//
	// `data`        Contains the parsed data.
	async onData({ data }: DataQueryResult) {
		if (this.dataEl) {
			this.dataEl.empty();
			this.dataEl.createDiv({ text: JSON.stringify(data.fields) });
			this.dataEl.createDiv({ text: JSON.stringify(data.records) });
		}
	}

	// onOpens is called whenever the user activates your view.
	//
	// `contentEl`    HTML element where you can attach your view.
	// `config`       JSON object with optional view configuration.
	// `saveConfig`   Callback to save configuration changes.
	// `readonly`     If true, you should disable any UI features that updates the
	//                underlying data. Currently, readonly is only true for
	//                Dataview projects, where fields may be computed.
	async onOpen({
		contentEl,
		config,
		saveConfig,
		readonly,
	}: ProjectViewProps) {
		console.log("Opening ", this.getDisplayName());

		contentEl.createEl("h1", { text: "My Sample View" });

		this.dataEl = contentEl.createEl("div");
	}

	// onOpens is called whenever the user leaves or removes your view.
	// Use this to clean up any resources you've created.
	async onClose() {
		console.log("Closing ", this.getDisplayName());
	}
}

export default class MyPlugin extends Plugin {
	// This method is called by Projects to register your view. The Projects
	// plugin may call this function multiple times to create the view.
	onRegisterProjectView = () => new MySampleView();
}
