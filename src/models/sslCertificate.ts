export class SslCertificate {
    commonName: string;
    validFrom: Date;
    validUntil: Date;
    issuer: string;
    subject: string;
    serialNumber: string;
    fingerprint: string;
    subjectAltNames: string[];
    host: string;

    constructor(
        commonName: string,
        validFrom: Date,
        validUntil: Date,
        issuer: string,
        subject: string,
        serialNumber: string,
        fingerprint: string,
        subjectAltNames: string[],
        host: string
    ) {
        this.commonName = commonName;
        this.validFrom = validFrom;
        this.validUntil = validUntil;
        this.issuer = issuer;
        this.subject = subject;
        this.serialNumber = serialNumber;
        this.fingerprint = fingerprint;
        this.subjectAltNames = subjectAltNames;
        this.host = host;
    }

    getDetails(): string {
        return `Common Name: ${this.commonName}, Valid Until: ${this.validUntil.toDateString()}`;
    }

    isValid(): boolean {
        const now = new Date();
        return now >= this.validFrom && now <= this.validUntil;
    }

    getDaysUntilExpiry(): number {
        const now = new Date();
        const diff = this.validUntil.getTime() - now.getTime();
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        // Return 0 for expired certificates instead of negative values
        return days < 0 ? 0 : days;
    }
}