import * as vscode from 'vscode';
import { SslCertificate } from './models/sslCertificate';

export class SslCertTreeDataProvider implements vscode.TreeDataProvider<SslCertTreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<SslCertTreeItem | undefined | null | void> = new vscode.EventEmitter<SslCertTreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<SslCertTreeItem | undefined | null | void> = this._onDidChangeTreeData.event;

    constructor() {
        // Initialize the data provider
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: SslCertTreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: SslCertTreeItem): Thenable<SslCertTreeItem[]> {
        if (!element) {
            // Return root level items
            return Promise.resolve(this.getRootCertificates());
        } else {
            // Return children of the given element
            return Promise.resolve(element.children || []);
        }
    }

    private getRootCertificates(): SslCertTreeItem[] {
        // Placeholder: Return sample SSL certificates
        const sampleCert = new SslCertificate('example.com', new Date('2025-12-31'));
        const certItem = new SslCertTreeItem(
            sampleCert.commonName,
            vscode.TreeItemCollapsibleState.Collapsed
        );
        
        // Add certificate details as children
        certItem.children = [
            new SslCertTreeItem(`Valid Until: ${sampleCert.validUntil.toDateString()}`, vscode.TreeItemCollapsibleState.None),
            new SslCertTreeItem(`Issuer: Sample CA`, vscode.TreeItemCollapsibleState.None),
            new SslCertTreeItem(`Serial Number: 1234567890`, vscode.TreeItemCollapsibleState.None)
        ];
        
        return [certItem];
    }
}

export class SslCertTreeItem extends vscode.TreeItem {
    children: SslCertTreeItem[] | undefined;

    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        children?: SslCertTreeItem[]
    ) {
        super(label, collapsibleState);
        this.children = children;
    }
}