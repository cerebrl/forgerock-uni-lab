[![npm (scoped)](https://img.shields.io/npm/v/@forgerock/javascript-sdk?color=%23f46200&label=Version&style=flat-square)](CHANGELOG.md)

<p align="center">
  <a href="https://github.com/ForgeRock">
    <img src="https://www.forgerock.com/themes/custom/forgerock/images/fr-logo-horz-color.svg" alt="Logo">
  </a>
  <h2 align="center">ForgeRock University SDK Course for JavaScript</h2>
<hr/></p>

The ForgeRock SDK Course Application for JavaScript SDK

## Requirements

- ForgeRock Identity Platform
    - Access Management (AM) 7+

- Browsers:
    - Edge 83 (Chromium)
    - Chrome 83
    - Firefox 77

## Getting Started

To try out the ForgeRock JavaScript SDK UI, perform these steps:

1. Setup CORS support in an Access Management (AM) instance.

   See [Enabling CORS Support](https://sdks.forgerock.com/js/01_prepare-am/#enabling-cors-support) in the Documentation.

2. Create an authentication tree in AM.

   See [Creating a User Authentication Tree](https://sdks.forgerock.com/js/01_prepare-am/#creating-a-user-authentication-tree) in the Documentation.

3. Clone this repo:

    ```sh
    git clone https://github.com/cerebrl/uni-lab.git
    ```

4. In the root folder of the repo, use NPM to install dependencies:

    ```sh
    npm install
    ```

5. Build the ForgeRock JavaScript SDK:

    ```sh
    npm run build
    ```

6. This SDK requires HTTPS (secure protocol) which means security (SSL/TLS) certificates are necessary. For local testing and development, it's common to generate your own self-signed certificates. To generate your own certs, use the following:

    - Using [this utility (`mkcert`) can help simplify the process of creating trusted certs](https://github.com/FiloSottile/mkcert)
    - After following `mkcert`'s installation guide and simple example/demo of creating certs (at the top of the readme), you should have two files: `example.com+5.pem` & `example.com+5-key.pem`

        (Ensure these two files are in the root of this project)

    > **Warning: Self-signed certificates or certificates not from an industry-recognized, certificate authority (CA) should never be used in production.**

7. Start the servers to serve the two apps: client and server.

   ```
   # In one terminal run the app
   npm run start:client

   # In another terminal, run the server
   npm run start:server
   ```

8. Edit your `/etc/hosts` file to point your localhost (e.g. `127.0.0.1`) to `sdkapp.example.com`

9. In a [supported web browser](#requirements), navigate to `https://sdkapp.example.com:8443`.

## Development

This project uses Webpack and Babel to transpile (kind of like a compile) the JSX that React uses to plain JavaScript functions. Because of this, you will have to build the application after any edits. To avoid having to manually run `npm run build` after each change, one can run `npm run watch`, and it will monitor your files and run a build after each save.

So, during development, you will have three terminal windows open, each running one from the list below:

```
# Terminal 1
npm run watch

# Terminal 2
npm run start:app

# Terminal 3
npm run start:server
```

## Tech Stack

This project uses a few libraries to simplify development:

### React.js

React is a view library that manages all DOM interactions and ensures rerendering on state changes. The Context API as well as local component state are used in this application. The state set in the Context is global state (e.g. is the user authenticated?), and the state set in local is only for that component (e.g. managing the step in the auth tree).

Concepts used in React:

1. Context API
2. Hooks (useState, useEffect, useContext)
3. Functional Components
4. JSX

### Page.js

Page is a routing library for the Web that mimics the super popular Express library used for server JavaScript apps.

### Webpack.js

Webpack is a bundling library that will take all the modularized code and bundle it into a single distribution file. This allows for developers to write in separate files, but continue to only import a single JavaScript file in the HTML file.

### Babel

Babel is a transpilation library (think of it like a compiler) that allows you to write in unsupported technologies, like JSX, and have it converted to regular JavaScript for execution.
