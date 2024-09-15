import {
	MarkdownView,
	Plugin,
} from 'obsidian';

export default class EditingModeHotkey extends Plugin {

	async onload() {
		console.log('loading obisidian-editing-mode-hotkey');

			this.addCommand({
				id: 'toggleDefaultEditingMode',
				name: 'Toggle default editing mode (Source/Live Preview)',
				hotkeys: [
					{
						modifiers: ['Mod', 'Shift'],
						key: 'E',
					},
				],
				editorCallback: () => this.toggleDefaultEditingMode(),
			});

	}

private toggleDefaultEditingMode() {
		// check the curren default view mode
		const livePreview = this.app.vault.getConfig("livePreview");

		// set the view mode of all tabs to either source or live preview
		if (livePreview === false) {
				this.app.vault.setConfig("livePreview", true);
				this.app.workspace.iterateAllLeaves(leaf => {
				const view = leaf.getViewState();
				// check if the current view mode is in edit view, to prevent the state of tabs such as kanban boards to be changed
				if (view.state.mode === 'source') {
					view.state.source = false;
					leaf.setViewState(view);
				}
			});
		} else if (livePreview === true) {
			this.app.vault.setConfig("livePreview", false);
			this.app.workspace.iterateAllLeaves(leaf => {
				const view = leaf.getViewState();
				// check if the current view mode is in edit view, to prevent the state of tabs such as kanban boards to be changed
				if (view.state.mode === 'source') {
					view.state.source = true;
					leaf.setViewState(view);
				}
			});
		}
	}
}
