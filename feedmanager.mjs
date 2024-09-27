import { dirname, join} from 'path';
import { fileURLToPath } from 'url';
import { access, constants, writeFile, readFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const jsonFile = join(__dirname, 'feeds.json'); 

export async function getFeeds() {
  try {
    await access(jsonFile, constants.F_OK);
  } catch (error) {
    await writeFile(jsonFile, JSON.stringify([]));
  }
  const feeds = await readFile(jsonFile, {encoding: 'utf-8'});
  return JSON.parse(feeds);
}

export async function saveFeeds(feeds) {
  await writeFile(jsonFile, JSON.stringify(feeds));
}