
import { readFile, writeFile, rename } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import {
  TYPE_REGISTRY,
  type ObjectType,
  ID_PREFIX,
} from "../schemas/avh-ids/types";

type Counters = Record<ObjectType, number>;

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));

const countersPath = path.resolve(
  scriptDirectory,
  "../schemas/avh-ids/counters.json"
);

async function generateId(type: ObjectType): Promise<string> {
  if (!Object.keys(TYPE_REGISTRY).includes(type)) {
    throw new Error(`Unknown object TYPE: ${type}`);
  }

  const raw = await readFile(countersPath, "utf-8");
  const counters = JSON.parse(raw) as Counters;

  const current = counters[type];

  if (!Number.isInteger(current) || current < 0 || current >= 99999) {
    throw new Error(`Invalid or exhausted counter for TYPE: ${type}`);
  }

  const next = current + 1;

  counters[type] = next;

  const temporaryPath = `${countersPath}.tmp`;

  await writeFile(
    temporaryPath,
    JSON.stringify(counters, null, 2) + "\n",
    "utf-8"
  );

  await rename(temporaryPath, countersPath);

  return `${ID_PREFIX}-${type}-${String(next).padStart(5, "0")}`;
}

const requestedType = process.argv[2] as ObjectType | undefined;

if (!requestedType) {
  console.error("Usage: npx tsx scripts/generate-id.ts <TYPE>");
  process.exit(1);
}

try {
  const id = await generateId(requestedType);
  console.log(id);
} catch (error) {
  console.error(
    error instanceof Error ? error.message : "Unknown error"
  );
  process.exit(1);
}
