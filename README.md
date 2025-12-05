# README.md

# SSL Cert Viewer (VS Code Extension)

SSL Cert Viewer is a Visual Studio Code extension that provides a tree view representation of SSL certificate values. It allows users to easily view important information such as the Common Name (CN), validity period, and other fields of SSL certificates.

## Features

- Display SSL certificate information in a structured tree view.
- Retrieve and parse SSL certificate data.
- View details such as CN, valid until date, and other relevant fields.

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

- After installing the extension, you can access the SSL Cert Viewer from the Activity Bar on the side of the VS Code window.
- The "SSL Certificates" view will appear in the Explorer sidebar.
- Click on "Show SSL Certificates" command from the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) to activate the extension.
- Select an SSL certificate to view its details in the tree structure.

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

### Items Requiring Action Before Publishing
- ⚠️ Update publisher name in package.json (currently "your-name")
- ⚠️ Add LICENSE file (referenced but not present)
- ⚠️ Implement actual SSL certificate fetching logic (currently placeholder)
- ⚠️ Add unit tests
- ⚠️ Add integration tests
- ⚠️ Consider adding extension icon
- ⚠️ Add repository URL to package.json
- ⚠️ Increment version number when ready to publish
