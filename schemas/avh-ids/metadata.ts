
import { z } from "zod";

import {
  TYPE_REGISTRY,
  SUBJECT_REGISTRY,
  STATUS_REGISTRY,
  CLASSIFICATION_REGISTRY,
  ID_PATTERN,
  REVISION_PATTERN,
} from "./types";

// Validate AvH object ID, including registered TYPE codes.
export const objectIdSchema = z
  .string()
  .regex(ID_PATTERN, "Invalid AvH object ID")
  .refine((id) => {
    const type = id.split("-")[1];
    return type in TYPE_REGISTRY;
  }, "Unknown object TYPE");

// Metadata schema
export const metadataSchema = z.object({
  ID: objectIdSchema,

  TYPE: z.enum(
    Object.keys(TYPE_REGISTRY) as [
      keyof typeof TYPE_REGISTRY,
      ...(keyof typeof TYPE_REGISTRY)[]
    ]
  ),

  TITLE: z.string().min(1),

  SUBJECT: z.enum(
    Object.keys(SUBJECT_REGISTRY) as [
      keyof typeof SUBJECT_REGISTRY,
      ...(keyof typeof SUBJECT_REGISTRY)[]
    ]
  ),

  STATUS: z.enum(
    Object.keys(STATUS_REGISTRY) as [
      keyof typeof STATUS_REGISTRY,
      ...(keyof typeof STATUS_REGISTRY)[]
    ]
  ),

  CLASSIFICATION: z.enum(
    Object.keys(CLASSIFICATION_REGISTRY) as [
      keyof typeof CLASSIFICATION_REGISTRY,
      ...(keyof typeof CLASSIFICATION_REGISTRY)[]
    ]
  ),

  DATE_CREATED: z.string().date(),

  DATE_PUBLISHED: z.string().date().optional(),

  DATE_UPDATED: z.string().date(),

  DESCRIPTION: z.string().optional(),

  TAGS: z.array(z.string()).optional(),

  AUTHOR: z.string().optional(),

  LANGUAGE: z.string().optional(),

  REVISION: z.string().regex(REVISION_PATTERN).optional(),

  ORIGIN: z.string().optional(),

  STORAGE: z.array(z.string()).optional(),
});

// TypeScript type inferred from the schema
export type AvHMetadata = z.infer<typeof metadataSchema>;
