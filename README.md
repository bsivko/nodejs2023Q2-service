# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
docker-compose up
```

## Testing

After application running open new terminal and enter:

```
npm run test
```

### Vulnerabilities checking

```
npm run start:scout
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

## Open API Doc Generation

Run

```
npm run start
```

And go to `http://localhost:PORT/api-yaml` page in your browser (PORT depends on your `.env` file).

Last generated doc see updated in `/doc/api.yaml`.
