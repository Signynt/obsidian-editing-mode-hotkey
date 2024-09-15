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
		// check the view mode of the current tab
		const activeView = this.app.workspace.getActiveViewOfType(MarkdownView)
		if (!activeView) return;
			const view = activeView.getState();

		// set the view mode of all windows to the opposite of the current view mode
		if (view.source === true) {
				this.app.workspace.iterateAllLeaves(leaf => {
				const view = leaf.getViewState();
				// check if the current view mode is in edit view, to prevent the state of tabs such as kanban boards to be changed
				if (view.state.mode === 'source') {
					view.state.source = false;
					leaf.setViewState(view);
				}
			});
		} else if (view.source === false) {
			this.app.workspace.iterateAllLeaves(leaf => {
				const view = leaf.getViewState();
				// check if the current view mode is in edit view, to prevent the state of tabs such as kanban boards to be changed
				if (view.state.mode === 'source') {
					view.state.source = true;
					leaf.setViewState(view);
				}
			});
		}

		// Set the default view mode to source mode, or live preview
		const livePreview = this.app.vault.getConfig("livePreview");
		this.app.vault.setConfig("livePreview", !livePreview);
	}
}
