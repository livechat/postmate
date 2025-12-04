import fs from "fs";
import path from "path";
import { gzipSizeFromFile } from "gzip-size";

const readme = path.join(process.cwd(), "README.md");
const data = fs.readFileSync(readme, "utf-8");

const distSize = await gzipSizeFromFile(
	path.join(process.cwd(), "build/postmate.min.js")
);

const updated = data.replace(
	/<span class="size">(.*?)<\/span>/,
	`<span class="size">\`${(distSize / 1024).toFixed(1)}kb\`</span>`
);

fs.writeFileSync(readme, updated);
