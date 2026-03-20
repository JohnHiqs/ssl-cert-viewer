import * as vscode from 'vscode';
import { SslCertTreeDataProvider } from './sslCertTreeDataProvider';

export function activate(context: vscode.ExtensionContext) {
    const sslCertProvider = new SslCertTreeDataProvider();
    const treeView = vscode.window.createTreeView('sslCertView', { 
        treeDataProvider: sslCertProvider 
    });

    // Command to add a certificate
    let addCertCommand = vscode.commands.registerCommand('sslCertViewer.addCertificate', async () => {
        const host = await vscode.window.showInputBox({
            prompt: 'Enter hostname (e.g., google.com or github.com:443)',
            placeHolder: 'google.com',
            validateInput: (value: string) => {
                if (!value || value.trim().length === 0) {
                    return 'Hostname cannot be empty';
                }
                return null;
            }
        });

        if (host) {
            await sslCertProvider.addCertificate(host.trim());
        }
    });

    // Command to refresh certificates
    let refreshCommand = vscode.commands.registerCommand('sslCertViewer.refresh', () => {
        sslCertProvider.refresh();
        vscode.window.showInformationMessage('SSL Certificates refreshed');
    });

    // Command to clear all certificates
    let clearCommand = vscode.commands.registerCommand('sslCertViewer.clear', () => {
        sslCertProvider.clearCertificates();
        vscode.window.showInformationMessage('All certificates cleared');
    });

    // Legacy command for backwards compatibility
    let showCommand = vscode.commands.registerCommand('sslCertViewer.show', () => {
        vscode.window.showInformationMessage('SSL Cert Viewer activated! Use "Add Certificate" to fetch SSL certificates.');
    });

    context.subscriptions.push(treeView, addCertCommand, refreshCommand, clearCommand, showCommand);
}

export function deactivate() {}