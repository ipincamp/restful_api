# CHANGELOG

[ + ] v1.0.0 (03/06/2023)

```bash
# add dependencies
npm init
npm i bcrypt body-parser cors dotenv express joi jsonwebtoken mongoose pino pino-pretty uuid
```

```bash
# add dev dependencies
npm i -D nodemon ts-node typescript

# setup tsconfig
npx tsc --init
```

```json
// tsconfig.json
{
    "compilerOptions": {
        "target": "es2016",
        "module": "commonjs",
        "moduleResolution": "node",
        "baseUrl": ".",
        "paths": {
            "*": ["node_modules/*"]
        },
        "typeRoots": ["./src/types", "./node_modules/@types"],
        "resolveJsonModule": true,
        "sourceMap": true,
        "outDir": "dist",
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "strict": true,
        "noImplicitAny": true,
        "skipLibCheck": true
    },
    "exclude": ["node_modules/*"],
    "include": ["src/**/*"]
}
```

```json
// package.json
{
    "scripts": {
        "build": "tsc",
        "check": "nodemon",
        "start": "tsc -w",
        "test": "echo \"Error: no test specified\" && exit 1"
    }
}
```

```json
// nodemon.json
{
    "ext": "ts",
    "exec": "ts-node src/index.ts",
    "watch": ["src"]
}
```

```bash
# setup eslint
npm init @eslint/config

? How would you like to use ESLint? ...
  To check syntax only
  To check syntax and find problems
√ How would you like to use ESLint? · style
√ What type of modules does your project use? · esm
√ Which framework does your project use? · none
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · node
√ How would you like to define a style for your project? · guide
√ Which style guide do you want to follow? · standard-with-typescript
√ What format do you want your config file to be in? · JSON
Checking peerDependencies of eslint-config-standard-with-typescript@latest
Local ESLint installation not found.
The config that you've selected requires the following dependencies:

eslint-config-standard-with-typescript@latest @typescript-eslint/eslint-plugin@^5.50.0 eslint@^8.0.1 eslint-plugin-import@^2.25.2 eslint-plugin-n@^15.0.0 eslint-plugin-promise@^6.0.0 typescript@*
√ Would you like to install them now? · No / Yes
√ Which package manager do you want to use? · npm
```

```bash
# additional dev dependencies
npm i -D @types/express @typescript-eslint/parser eslint-plugin-node
```

```json
// .eslintrc.json
{
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": "standard-with-typescript",
    "ignorePatterns": ["**/dist/*", "**/node_modules/*", "**/public/*"],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": ["@typescript-eslint"],
    "rules": {
    }
}
```

```bash
# setup prettier
npm i --save-dev --save-exact prettier
```

```json
// .prettierrc
{
    "arrowParens": "always",
    "printWidth": 120,
    "semi": false,
    "singleQuote": true,
    "trailingComma": "none"
}
```

```json
// .prettierignore
build
dist
node_modules
out
public
.env
.env.development.local
.env.test.local
.env.production.local
.env.local
.eslintrc.json
.prettierrc
.vscode
CHANGELOG.md
LICENSE
nodemon.json
package.json
package-lock.json
README.md
tsconfig.json
vercel.json
yarn.lock
```

```json
// .eslintrc.json
{
    "ignorePatterns": ["**/dist/*", "**/node_modules/*", "**/public/*", "**/tsconfig.json"],
    "parserOptions": {
        "project": ["**/tsconfig.json"],
    },
}
```

```bash
# completely dev dependencies
npm i -D @types/bcrypt @types/cors @types/jsonwebtoken @types/uuid husky pretty-quick
```

```json
// package.json
{
    "scripts": {
        "check:types": "tsc --pretty --noEmit",
        "check:format": "prettier --check .",
        "check:eslint": "eslint . --ext js --ext ts --ext tsx",
        "format": "prettier --write .",
        "prepare": "husky install"
    },
    "husky": {
        "hooks": {
            "pre-commit": "pretty-quick --staged ng lint ng test",
            "pre-pushed": "ng build --aot true"
        }
    },
}
```

```bash
# setup husky
npm run prepare
```

```sh
# pre-commit

#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "Styling, Testing & Building your project before commiting!";

# Check Prettier
npm run check:format ||
{
    echo 'Prettier Check Failed! Run "npm run format", add changes & try to commit again.';
    false;
}

# Check ESLint
npm run check:eslint ||
{
    echo 'ESLint Check Failed! Make the required changes listed above, add changes & try to commit again.';
    false;
}

# Check tsconfig
npm run check:types ||
{
    echo 'Failed Type Check! Make the changes require abov, add changes & try to commit again.';
    false;
}

npm run build ||
{
    echo 'Your Build Failed! See the error above.';
    false;
}

echo "Success Commit"
```
