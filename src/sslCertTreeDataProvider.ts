import * as vscode from 'vscode';
import { SslCertificate } from './models/sslCertificate';
import { SslCertProvider } from './sslCertProvider';

export class SslCertTreeDataProvider implements vscode.TreeDataProvider<SslCertTreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<SslCertTreeItem | undefined | null | void> = new vscode.EventEmitter<SslCertTreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<SslCertTreeItem | undefined | null | void> = this._onDidChangeTreeData.event;
    private sslCertProvider: SslCertProvider;
    private certificates: SslCertificate[] = [];

    constructor() {
        this.sslCertProvider = new SslCertProvider();
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: SslCertTreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: SslCertTreeItem): Thenable<SslCertTreeItem[]> {
        if (!element) {
            // Return root level items (certificates)
            return Promise.resolve(this.getCertificateItems());
        } else {
            // Return children of the given element
            return Promise.resolve(element.children || []);
        }
    }

    /**
     * Add a certificate for a host
     */
    async addCertificate(host: string): Promise<void> {
        try {
            const cert = await this.sslCertProvider.fetchCertificate(host);
            this.certificates.push(cert);
            this.refresh();
            vscode.window.showInformationMessage(`Successfully fetched certificate for ${host}`);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            vscode.window.showErrorMessage(`Failed to fetch certificate: ${errorMessage}`);
        }
    }

    /**
     * Remove a certificate by host
     */
    removeCertificate(host: string): void {
        this.certificates = this.certificates.filter(cert => cert.host !== host);
        this.refresh();
    }

    /**
     * Clear all certificates
     */
    clearCertificates(): void {
        this.certificates = [];
        this.refresh();
    }

    private getCertificateItems(): SslCertTreeItem[] {
        if (this.certificates.length === 0) {
            return [
                new SslCertTreeItem(
                    'No certificates loaded',
                    vscode.TreeItemCollapsibleState.None,
                    undefined,
                    'info'
                )
            ];
        }

        return this.certificates.map(cert => {
            const isValid = cert.isValid();
            const daysUntilExpiry = cert.getDaysUntilExpiry();
            
            let statusIcon = '✓';
            let statusText = 'Valid';
            if (!isValid) {
                statusIcon = '✗';
                statusText = 'Expired';
            } else if (daysUntilExpiry === 0) {
                statusIcon = '✗';
                statusText = 'Expires today';
            } else if (daysUntilExpiry <= 30) {
                statusIcon = '⚠';
                statusText = `Expires in ${daysUntilExpiry} day${daysUntilExpiry === 1 ? '' : 's'}`;
            }

            const certItem = new SslCertTreeItem(
                `${statusIcon} ${cert.host} - ${cert.commonName}`,
                vscode.TreeItemCollapsibleState.Collapsed,
                undefined,
                'certificate'
            );

            // Add certificate details as children
            certItem.children = [
                new SslCertTreeItem(`Status: ${statusText}`, vscode.TreeItemCollapsibleState.None, undefined, 'field'),
                new SslCertTreeItem(`Common Name: ${cert.commonName}`, vscode.TreeItemCollapsibleState.None, undefined, 'field'),
                new SslCertTreeItem(`Valid From: ${cert.validFrom.toLocaleString()}`, vscode.TreeItemCollapsibleState.None, undefined, 'field'),
                new SslCertTreeItem(`Valid Until: ${cert.validUntil.toLocaleString()}`, vscode.TreeItemCollapsibleState.None, undefined, 'field'),
                new SslCertTreeItem(`Issuer: ${cert.issuer}`, vscode.TreeItemCollapsibleState.None, undefined, 'field'),
                new SslCertTreeItem(`Subject: ${cert.subject}`, vscode.TreeItemCollapsibleState.None, undefined, 'field'),
                new SslCertTreeItem(`Serial Number: ${cert.serialNumber}`, vscode.TreeItemCollapsibleState.None, undefined, 'field'),
                new SslCertTreeItem(`Fingerprint: ${cert.fingerprint}`, vscode.TreeItemCollapsibleState.None, undefined, 'field'),
            ];

            // Add subject alternative names if present
            if (cert.subjectAltNames.length > 0) {
                const altNamesItem = new SslCertTreeItem(
                    'Subject Alternative Names',
                    vscode.TreeItemCollapsibleState.Collapsed,
                    undefined,
                    'field'
                );
                altNamesItem.children = cert.subjectAltNames.map(name => 
                    new SslCertTreeItem(name, vscode.TreeItemCollapsibleState.None, undefined, 'value')
                );
                certItem.children.push(altNamesItem);
            }

            return certItem;
        });
    }
}

export class SslCertTreeItem extends vscode.TreeItem {
    children: SslCertTreeItem[] | undefined;

    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        children?: SslCertTreeItem[],
        public readonly contextValue?: string
    ) {
        super(label, collapsibleState);
        this.children = children;
        this.contextValue = contextValue;
    }
}