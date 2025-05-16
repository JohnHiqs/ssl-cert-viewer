class SslCertificateView {
    private panel: vscode.WebviewPanel | undefined;

    constructor() {
        this.panel = undefined;
    }

    public showSslCertificate(cert: SslCertificate) {
        if (this.panel) {
            this.panel.reveal();
        } else {
            this.createPanel(cert);
        }
    }

    private createPanel(cert: SslCertificate) {
        this.panel = vscode.window.createWebviewPanel(
            'sslCertificateView',
            `SSL Certificate: ${cert.commonName}`,
            vscode.ViewColumn.One,
            {}
        );

        this.panel.webview.html = this.getWebviewContent(cert);
        
        this.panel.onDidDispose(() => {
            this.panel = undefined;
        });
    }

    private getWebviewContent(cert: SslCertificate): string {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>SSL Certificate Details</title>
            </head>
            <body>
                <h1>SSL Certificate Details</h1>
                <p><strong>Common Name:</strong> ${cert.commonName}</p>
                <p><strong>Valid Until:</strong> ${cert.validUntil}</p>
                <h2>Other Fields</h2>
                <pre>${JSON.stringify(cert, null, 2)}</pre>
            </body>
            </html>
        `;
    }
}