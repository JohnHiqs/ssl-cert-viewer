import * as vscode from 'vscode';
import { SslCertTreeDataProvider } from './sslCertTreeDataProvider';

export function activate(context: vscode.ExtensionContext) {
    const sslCertProvider = new SslCertTreeDataProvider();
    const treeView = vscode.window.createTreeView('sslCertView', { 
        treeDataProvider: sslCertProvider 
    });

    let disposable = vscode.commands.registerCommand('sslCertViewer.show', () => {
        vscode.window.showInformationMessage('SSL Cert Viewer activated!');
    });

    context.subscriptions.push(treeView, disposable);
}

export function deactivate() {}