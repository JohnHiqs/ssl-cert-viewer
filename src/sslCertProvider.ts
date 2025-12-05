import * as tls from 'tls';
import { SslCertificate } from './models/sslCertificate';

export class SslCertProvider {
    constructor() {
        // Initialization code if needed
    }

    /**
     * Fetch SSL certificate from a host
     * @param host The hostname (e.g., "google.com" or "github.com:443")
     * @returns Promise with SSL certificate data
     */
    async fetchCertificate(host: string): Promise<SslCertificate> {
        return new Promise((resolve, reject) => {
            // Parse host and port
            let hostname = host;
            let port = 443;

            if (host.includes(':')) {
                const parts = host.split(':');
                hostname = parts[0];
                port = parseInt(parts[1], 10);
            }

            const options = {
                host: hostname,
                port: port,
                servername: hostname,
                rejectUnauthorized: false, // Allow self-signed certificates
            };

            const socket = tls.connect(options, () => {
                const cert = socket.getPeerCertificate();

                if (!cert || Object.keys(cert).length === 0) {
                    socket.destroy();
                    reject(new Error('No certificate found'));
                    return;
                }

                // Extract certificate information
                const commonName = cert.subject?.CN || hostname;
                const validFrom = new Date(cert.valid_from);
                const validUntil = new Date(cert.valid_to);
                const issuer = this.formatIssuer(cert.issuer);
                const subject = this.formatSubject(cert.subject);
                const serialNumber = cert.serialNumber || 'N/A';
                const fingerprint = cert.fingerprint || 'N/A';
                const subjectAltNames = this.extractSubjectAltNames(cert.subjectaltname);

                const sslCert = new SslCertificate(
                    commonName,
                    validFrom,
                    validUntil,
                    issuer,
                    subject,
                    serialNumber,
                    fingerprint,
                    subjectAltNames,
                    host
                );

                socket.destroy();
                resolve(sslCert);
            });

            socket.on('error', (error: Error) => {
                reject(new Error(`Failed to fetch certificate from ${host}: ${error.message}`));
            });

            socket.setTimeout(10000, () => {
                socket.destroy();
                reject(new Error(`Timeout while connecting to ${host}`));
            });
        });
    }

    /**
     * Format issuer object to readable string
     */
    private formatIssuer(issuer: any): string {
        if (!issuer) return 'Unknown';
        const parts = [];
        if (issuer.CN) parts.push(`CN=${issuer.CN}`);
        if (issuer.O) parts.push(`O=${issuer.O}`);
        if (issuer.C) parts.push(`C=${issuer.C}`);
        return parts.join(', ') || 'Unknown';
    }

    /**
     * Format subject object to readable string
     */
    private formatSubject(subject: any): string {
        if (!subject) return 'Unknown';
        const parts = [];
        if (subject.CN) parts.push(`CN=${subject.CN}`);
        if (subject.O) parts.push(`O=${subject.O}`);
        if (subject.C) parts.push(`C=${subject.C}`);
        return parts.join(', ') || 'Unknown';
    }

    /**
     * Extract subject alternative names from certificate
     */
    private extractSubjectAltNames(altNames: string | undefined): string[] {
        if (!altNames) return [];
        return altNames.split(', ').map(name => name.replace('DNS:', ''));
    }
}