import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "catCoding" is now active!');

	context.subscriptions.push(vscode.commands.registerCommand('catCoding.start', () => {
		vscode.window.showInformationMessage('I am coding, meow~');
		CatCodingPanel.createOrShow(context.extensionUri);
	}));
}

class CatCodingPanel {
	public static currentPanel: CatCodingPanel | undefined;
	public static readonly viewType = 'catCoding';
	public static readonly catName = 'catCoding';

	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionUri: vscode.Uri;

	private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
		this._panel = panel;
		this._extensionUri = extensionUri;
		this._panel.title = CatCodingPanel.catName;
		this._panel.webview.html = this._getHtmlForWebview(panel.webview, 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif');
	}

	public static createOrShow(extensionUri: vscode.Uri) {
		const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

		const panel = vscode.window.createWebviewPanel(
			CatCodingPanel.viewType,
			CatCodingPanel.catName,
			column || vscode.ViewColumn.One,
			{ 
				enableScripts: true,
				localResourceRoots: [extensionUri],
			}
		);

		CatCodingPanel.currentPanel = new CatCodingPanel(panel, extensionUri);
	}

	private _getHtmlForWebview(webview: vscode.Webview, catGifPath: string) {
		return `<!DOCTYPE html>
						<html lang="en">
						<head>
							<meta charset="UTF-8">
							<title>Cat Coding</title>
						</head>
						<body>
							<img src="${catGifPath}" width="300" />
							<h1>I'm busy</h1>
						</body>
						</html>`;
	}
}