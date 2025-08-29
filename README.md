# CMGFX

A template for creating interactive graphics for my website, inspired by NPR's
[dailygraphics](https://github.com/nprapps/dailygraphics-next) rig.

## Usage

This project was developed using Node 22 LTS. Other versions may work, but
have not been tested.

Clone the repository and install requirements:

    git clone ...
    cd cmgfx
    npm i

Make a `graphics` directory to store the graphics:

    mkdir graphics

Create a new graphic:

    npm run new test

This creates a new folder in the `graphics/` directory, copies the template files,
installs the node dependencies, and copies a `cd` command to your clipboard for easy
navigation.

The individual graphics are isolated from one another and use
[Vite](https://vite.dev) to build.

The following commands are available within a graphic directory:
- `npm run dev` — Runs the Vite dev server
- `npm run preview` — Previews the build locally
- `npm run build` — Builds files into `dist` folder for production

After running `npm run build`, `npm run upload` will upload the files to
S3-compatible storage using [s3cmd](https://s3tools.org/s3cmd). (Change the 
destination for new graphics by editing `scripts/new.js`.)

Uploaded graphics can be added to HTML pages with iframes using [@newswire/frames](https://github.com/rdmurphy/frames).

## License

MIT
