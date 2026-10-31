
/**
 * AvH Identification System (AvH-IDS)
 * Standard: v0.1
 *
 * Central registry of identifiers, classifiers and statuses.
 */

// ============================================================
// TYPE REGISTRY
// ============================================================

export const TYPE_REGISTRY = {
  DOC: "Document",
  TDC: "Technical Design & Construction",
  PIC: "Picture / Image",
  VID: "Video / Footage",
  DAT: "Data / Telemetry",
  SRC: "Source Code",
  ART: "Graphic Art",
  NTE: "Note / Journal Entry",
  PRT: "Prototype / Hardware",
} as const;

export type ObjectType = keyof typeof TYPE_REGISTRY;

// ============================================================
// SUBJECT REGISTRY
// ============================================================

export const SUBJECT_REGISTRY = {
  ENG: "Engineering & Hardware",
  DEV: "Software & Digital Infrastructure",
  RND: "Research & Applied Science",
  RCE: "Racing & Motorsport",
  SYS: "System & Organization",
  BLG: "Blog",
  NULL: "Unclassified",
} as const;

export type Subject = keyof typeof SUBJECT_REGISTRY;

// ============================================================
// STATUS REGISTRY
// ============================================================

export const STATUS_REGISTRY = {
  DRAFT: "Draft",
  WIP: "Work In Progress",
  TESTING: "Testing",
  ACTIVE: "Active",
  ARCHIVED: "Archived",
  LEGACY: "Legacy",
} as const;

export type ObjectStatus = keyof typeof STATUS_REGISTRY;

// ============================================================
// CLASSIFICATION REGISTRY
// ============================================================

export const CLASSIFICATION_REGISTRY = {
  PUBLIC: "Public",
  PRIVATE: "Private",
} as const;

export type Classification =
  keyof typeof CLASSIFICATION_REGISTRY;

// ============================================================
// IDENTIFICATION RULES
// ============================================================

export const ID_PREFIX = "AvH";

export const OBJECT_ID_LENGTH = 5;

export const RESERVED_OBJECT_ID = "00000";

export const FIRST_OBJECT_ID = "00001";

export const ID_PATTERN = /^AvH-[A-Z]{3}-\d{5}$/;

// ============================================================
// REVISION RULES
// ============================================================

export const REVISION_PATTERN = /^REV\.\d{2}\.\d{2}\.\d{2}$/;

export const INITIAL_REVISION = "REV.01.00.00";

// ============================================================
// DERIVED REGISTRIES
// ============================================================

export const TYPE_CODES = Object.keys(
  TYPE_REGISTRY
) as ObjectType[];

export const SUBJECT_CODES = Object.keys(
  SUBJECT_REGISTRY
) as Subject[];

export const STATUS_CODES = Object.keys(
  STATUS_REGISTRY
) as ObjectStatus[];

export const CLASSIFICATION_CODES = Object.keys(
  CLASSIFICATION_REGISTRY
) as Classification[];
