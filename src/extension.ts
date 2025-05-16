import * as vscode from 'vscode';
import { SslCertTreeDataProvider } from './sslCertTreeDataProvider';

export function activate(context: vscode.ExtensionContext) {
    const sslCertProvider = new SslCertTreeDataProvider();
    vscode.window.createTreeView('sslCertViewer', { treeDataProvider: sslCertProvider });

    context.subscriptions.push(sslCertProvider);
}

export function deactivate() {}