import * as vscode from 'vscode';
import { SslCertTreeDataProvider } from './sslCertTreeDataProvider';

export function activate(context: vscode.ExtensionContext) {
    const sslCertProvider = new SslCertTreeDataProvider();
    vscode.window.registerTreeDataProvider('sslCertView', sslCertProvider);

    let disposable = vscode.commands.registerCommand('sslCertViewer.show', () => {
        vscode.window.showInformationMessage('SSL Cert Viewer activated!');
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}