import {
    existsSync,
    mkdirSync,
    cpSync,
    readFileSync,
    writeFileSync
} from 'node:fs';
import { resolve } from 'node:path';
import { execSync } from 'node:child_process';
import clipboard from 'clipboardy';
import pc from 'picocolors';

const createNew = async () => {
    const templatePath = resolve('../template');
    const inputSlug = process.argv[2];
    const today = new Date();
    const year = today.getFullYear();
    const slug = `${year}-${inputSlug}`;

    const graphicPath = resolve('../', 'graphics', slug)

    if (existsSync(graphicPath)) {
        console.log(pc.red(pc.bold(`${slug} exists. Exiting.`)));
        return false;
    }

    console.log(pc.green('Making directory...'));
    mkdirSync(graphicPath);

    console.log(pc.green('Copying files...'));
    cpSync(`${templatePath}/`, `${graphicPath}/`, { recursive: true });

    // update package.json with slug and publish command
    const pkg = JSON.parse(readFileSync(`${graphicPath}/package.json`, { encoding: 'utf8'}));

    pkg.name = slug;
    pkg.scripts['upload'] = `s3cmd put dist/ s3://static.curtmerrill.com/includes/${slug}/ -P -r`;

    writeFileSync(`${graphicPath}/package.json`, JSON.stringify(pkg, null, 2), { encoding: 'utf8' });

    console.log(pc.green('Installing requirements...'));
    execSync(`cd ${graphicPath} && npm i`);

    clipboard.writeSync(`cd ${graphicPath}`);
    console.log(pc.green(pc.bold('Done!')));
    console.log(`To start: ${pc.green(`cd graphics/${slug}`)} (copied to clipboard)}`);

}

createNew();
