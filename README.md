[![npm (scoped)](https://img.shields.io/npm/v/@forgerock/javascript-sdk?color=%23f46200&label=Version&style=flat-square)](CHANGELOG.md)


<p align="center">
  <a href="https://github.com/ForgeRock">
    <img src="https://www.forgerock.com/themes/custom/forgerock/images/fr-logo-horz-color.svg" alt="Logo">
  </a>
  <h2 align="center">ForgeRock University SDK Course for JavaScript</h2>
<hr/></p>

The ForgeRock SDK Course Application for JavaScript SDK

## Requirements

* ForgeRock Identity Platform
    * Access Management (AM) 7+

* Browsers:
    * Edge 83 (Chromium)
    * Chrome 83
    * Firefox 77

## Installation

```
npm i
```

## Getting Started

To try out the ForgeRock JavaScript SDK UI, perform these steps:

1. Setup CORS support in an Access Management (AM) instance.

   See [Enabling CORS Support](https://sdks.forgerock.com/js/01_prepare-am/#enabling-cors-support) in the Documentation.

2. Create an authentication tree in AM.

   See [Creating a User Authentication Tree](https://sdks.forgerock.com/js/01_prepare-am/#creating-a-user-authentication-tree) in the Documentation.

3. Clone this repo:

    ```sh
    git clone https://github.com/ForgeRock/forgerock-javascript-sdk-ui.git
    ```

4. In the root folder of the repo, use NPM to install dependencies:

    ```sh
    npm install
    ```

5. Build the ForgeRock JavaScript SDK:

    ```sh
    npm run build
    ```

6. Open `samples/basic/index.html` and edit the configuration values to match your AM instance.

7. This SDK requires HTTPS (secure protocol) which means security (SSL/TLS) certificates are necessary. For local testing and development, it's common to generate your own self-signed certificates. You're free to use any method to do this, but if you need assistance in generating your own certs, the following can be helpful:

    - Using [this utility (`mkcert`) can help simplify the process of creating trusted certs](https://github.com/FiloSottile/mkcert)
    - After following `mkcert`'s installation guide and simple example of creating certs, you should have two files: `example.com+5.pem` & `example.com+5-key.pem`

        (Ensure these two files are in the root of this project)

    > **Warning: Self-signed certificates or certificates not from an industry-recognized, certificate authority (CA) should never be used in production.**

8. Serve the `samples` directory by using a simple HTTP server.

   - If you used the `mkcert` utility from above, followed their tutorial, and the files are in the root of this project, simply run `npm run start:samples`
   - Or, if you generated certs using a different method, you will need to run the below with your certificate and key file names you created:

       ```sh
       http-server samples -c1 -p 8443 --ssl --cert <your_certificate> --key <your_private_key>
       ```

9. Edit your `/etc/hosts` file to point your localhost (e.g. `127.0.0.1`) to `sdkapp.example.com`

10. In a [supported web browser](#requirements), navigate to `https://sdkapp.example.com:8443`, and then click
 **Custom UI**.
