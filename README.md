# hsiaa

## Setup

```sh
nvm use lts/hydrogen
npm install
```

### Run

The production URLs for Rasdaman and the Data API are used by default. These can be overridden like so:

```
VITE_SNAP_API_URL=http://localhost:5000
VITE_WMS_URL=https://zeus.snap.uaf.edu/rasdaman/ows
```

Then, to run the app locally:

```sh
npm run dev
```

### Build for production

```sh
npm run build
```

The built application is stored in the `dist` subdirectory.