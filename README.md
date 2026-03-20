# README.md

# SSL Cert Viewer (VS Code Extension)

SSL Cert Viewer is a Visual Studio Code extension that provides a tree view representation of SSL certificate values. It allows users to easily view important information such as the Common Name (CN), validity period, and other fields of SSL certificates.

## Features

- **Live SSL Certificate Fetching**: Connect to any HTTPS host and retrieve its SSL certificate
- **Comprehensive Certificate Details**: View all important certificate information
- **Visual Status Indicators**: Quickly identify valid, expiring, and expired certificates
- **Multiple Certificate Support**: Monitor multiple hosts simultaneously
- **User-Friendly Interface**: Integrated tree view in VS Code Explorer
- **Self-Signed Certificate Support**: Works with self-signed certificates for development environments

## Installation

### From Source

1. Clone the repository:
   ```bash
   git clone https://github.com/JohnHiqs/ssl-cert-viewer.git
   ```

2. Navigate to the project directory:
   ```bash
   cd ssl-cert-viewer
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Compile the TypeScript code:
   ```bash
   npm run compile
   ```

5. Open the project in Visual Studio Code:
   ```bash
   code .
   ```

6. Press `F5` to run the extension in a new Extension Development Host window.

## Usage

### Adding Certificates

1. Open the VS Code Explorer sidebar
2. Find the "SSL Certificates" view
3. Click the "+" (Add Certificate) button in the view title bar
4. Enter a hostname when prompted (e.g., `google.com`, `github.com:443`)
5. The extension will fetch and display the SSL certificate details

### Viewing Certificate Details

- Click on a certificate in the tree view to expand it
- View detailed information including:
  - Certificate validity status
  - Common Name (CN)
  - Valid From and Valid Until dates
  - Issuer information
  - Subject information
  - Serial Number
  - Fingerprint
  - Subject Alternative Names (SANs)

### Managing Certificates

- **Refresh**: Click the refresh button to update the certificate list
- **Clear All**: Remove all certificates from the view
- **Status Indicators**:
  - ✓ = Valid certificate
  - ⚠ = Expires within 30 days
  - ✗ = Expired certificate

### Command Palette

Access SSL Cert Viewer commands through the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`):
- `SSL Cert Viewer: Add Certificate` - Add a new certificate
- `SSL Cert Viewer: Refresh` - Refresh the certificate list
- `SSL Cert Viewer: Clear All Certificates` - Remove all certificates

## Development

### Build

To compile the extension:
```bash
npm run compile
```

### Watch Mode

To run the compiler in watch mode:
```bash
npm run watch
```

### Package Extension

To package the extension for distribution:
```bash
npm install -g @vscode/vsce
vsce package
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Production Readiness Notes

### Completed Items
- ✅ Fixed TypeScript compilation errors
- ✅ Updated to use modern VSCode extension API (@types/vscode)
- ✅ Implemented proper TreeDataProvider interface
- ✅ Added .vscodeignore for proper packaging
- ✅ Added .gitignore to exclude build artifacts
- ✅ Fixed view ID consistency
- ✅ **Implemented actual SSL certificate fetching using Node.js TLS module**
- ✅ **Added comprehensive certificate parsing and display**
- ✅ **Added user commands for managing certificates**
- ✅ **Added status indicators for certificate validity**

### Items Requiring Action Before Publishing
- ⚠️ Update publisher name in package.json (currently "your-name")
- ⚠️ Add LICENSE file (referenced but not present)
- ⚠️ Add unit tests
- ⚠️ Add integration tests
- ⚠️ Consider adding extension icon
- ⚠️ Add repository URL to package.json
- ⚠️ Increment version number when ready to publish
