export class SslCertificate {
    commonName: string;
    validUntil: Date;
    // Add other fields as necessary

    constructor(commonName: string, validUntil: Date) {
        this.commonName = commonName;
        this.validUntil = validUntil;
    }

    getDetails(): string {
        return `Common Name: ${this.commonName}, Valid Until: ${this.validUntil.toDateString()}`;
    }
}