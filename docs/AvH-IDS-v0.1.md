# AvH-IDS Standard v0.1

**Project:** AvH — August von Hofmann  
**Version:** 0.1  
**Status:** Draft  
**Purpose:** Identification, classification and cataloguing of AvH digital objects.

---

## 1. General principles

AvH-IDS (AvH Identification System) is the identification and metadata standard used throughout the AvH website and digital archive.

The system covers documents, technical drawings, images, videos, datasets, source code, graphic artwork, notes and physical prototypes.

Core principles:

- Every registered object has a unique identifier.
- Identifiers are generated automatically.
- An assigned identifier is immutable and never reused.
- Classification is independent of identification.
- Metadata should remain lightweight and extensible.
- Objects may be public or private.

## 2. Identification system

### 2.1 Canonical ID format

`AvH-[TYPE]-[OBJECT_ID]`

Example:

`AvH-DOC-00042`

Components:

| Component | Description |
|---|---|
| `AvH` | Project namespace |
| `TYPE` | Three-letter object type |
| `OBJECT_ID` | Five-digit sequential number |

Validation pattern:

`^AvH-[A-Z]{3}-\d{5}$`

### 2.2 ID generation

- IDs are generated automatically during object registration.
- Counters are maintained separately for each TYPE.
- `00000` is reserved for reference records and classifier documentation.
- Regular objects start at `00001`.
- IDs are immutable.
- Deleted IDs must never be reused.
- Generation must be atomic to prevent duplicates during concurrent registration.

### 2.3 Examples

- `AvH-DOC-00042`
- `AvH-PIC-00412`
- `AvH-SRC-00108`

## 3. TYPE registry

TYPE defines what an object is.

| Code | Name | Description |
|---|---|---|
| DOC | Document | Reports, specifications, articles, regulations and structured documents |
| TDC | Technical Design & Construction | Engineering drawings, CAD models, technical diagrams, PCB designs and technical representations |
| PIC | Picture / Image | Photographs, renders, screenshots and visual reference materials |
| VID | Video / Footage | Videos, animations and test recordings |
| DAT | Data / Telemetry | CSV files, raw datasets, logs and simulation results |
| SRC | Source Code | Source code, scripts, software modules and algorithms |
| ART | Graphic Art | Original artwork, illustrations, logos and graphic compositions |
| NTE | Note / Journal Entry | Personal notes, observations, diary entries and informal records |
| PRT | Prototype / Hardware | Physical prototypes, components, assemblies and hardware |

### 3.1 TYPE classification rules

**DOC vs NTE**

DOC represents a structured document with independent content and a defined purpose.

NTE represents informal notes, observations or chronological records.

**ART vs PIC**

ART represents creative and artistic work.

PIC represents images used as visual materials or references.

Examples:
- Original illustrated flag: ART.
- Reference image of the United States flag: PIC.
- Photograph of a Pan Am aircraft: PIC.
- Original artistic illustration of a Pan Am aircraft: ART.

**TDC**

TDC includes engineering drawings, CAD models, electrical diagrams, PCB projects, algorithm flowcharts and software architecture diagrams.

**Multiple objects**

A single project may contain multiple independently registered objects with different TYPE values.

## 4. SUBJECT registry

SUBJECT identifies the primary subject area of an object.

| Code | Name | Scope |
|---|---|---|
| ENG | Engineering & Hardware | Engineering, mechanical systems and physical projects |
| DEV | Software & Digital Infrastructure | Programming, applications, websites and digital systems |
| RND | Research & Applied Science | Research, scientific calculations and applied science |
| RCE | Racing & Motorsport | Motorsport, racing projects and telemetry |
| SYS | System & Organization | Internal systems and organizational structures |
| BLG | Blog | Blog publications |
| NULL | Unclassified | Not yet classified |

Rules:

- Every object must have a SUBJECT field.
- `NULL` is an allowed value.
- SUBJECT is independent of the object ID.
- New SUBJECT values may be introduced when necessary.
- Additional topics should normally be represented through TAGS.
- SUBCATEGORY is not used in this version.

BLG is an intentional publication-oriented exception within the subject registry.

## 5. Metadata specification

### 5.1 Required fields

| Field | Type | Description |
|---|---|---|
| ID | String | Canonical object identifier |
| TYPE | String | Object type |
| TITLE | String | Object title |
| SUBJECT | String | Primary subject |
| STATUS | String | Object lifecycle state |
| CLASSIFICATION | String | Access classification |
| DATE_CREATED | Date | Creation of the object record on the AvH website |

### 5.2 Optional fields

| Field | Type | Description |
|---|---|---|
| DESCRIPTION | String | Object description |
| TAGS | Array | Free-form thematic tags |
| AUTHOR | Array or String | Author or authors |
| LANGUAGE | String | Content language |
| REVISION | String | Object revision |
| DATE_PUBLISHED | Date | First publication date |
| ORIGIN | String | Object origin |
| STORAGE | Array or String | Storage locations |

### 5.3 System-managed fields

| Field | Description |
|---|---|
| DATE_UPDATED | Automatically maintained date of the last object or metadata update |

### 5.4 Date rules

- DATE_CREATED records the initial creation of the object's record on the AvH website.
- DATE_PUBLISHED records the first transition from draft to public availability.
- DATE_PUBLISHED is not overwritten during subsequent publications.
- DATE_UPDATED changes whenever the object or its metadata is modified.
- DATE_REGISTERED is not used.

Dates use ISO 8601 representation.

## 6. STATUS registry

| Status | Description |
|---|---|
| DRAFT | Draft, not yet published |
| WIP | Work In Progress |
| TESTING | Under testing or review |
| ACTIVE | Active and current |
| ARCHIVED | Archived and retained for reference |
| LEGACY | Outdated; use only when no suitable alternative exists |

Statuses describe the object's lifecycle, not its public visibility.

Objects may be published while having WIP, TESTING or other appropriate statuses.

Statuses are not required to follow a strictly linear progression.

## 7. CLASSIFICATION registry

| Value | Description |
|---|---|
| PUBLIC | Available to public visitors |
| PRIVATE | Restricted to authorized users and systems |

Classification is independent of STATUS.

Changing classification does not change the object's ID.

Actual access restrictions must be enforced by the application and storage infrastructure.

## 8. REVISION

Revision format:

`REV.XX.XX.XX`

Examples:

- `REV.01.00.00`
- `REV.01.01.00`
- `REV.01.01.01`
- `REV.02.00.00`

Each component contains two digits.

The field is optional.

The exact revision-increment policy remains to be formalized.

## 9. ORIGIN and STORAGE

Both fields are optional.

**ORIGIN** describes where an object originated.

Example values:
- SELF_CREATED
- EXTERNAL
- IMPORTED

**STORAGE** describes where the object is physically or digitally stored.

Example values:
- GITHUB
- R2
- LOCAL
- SERVER

These are examples, not a closed registry.

## 10. TAGS

TAGS provide flexible thematic classification.

Rules:

- Tags are optional.
- Multiple tags are permitted.
- Tags use lowercase Latin characters.
- `kebab-case` is recommended.
- The registry is open and may grow freely.

Example:

`["formula-one", "aerodynamics", "CFD"]`

## 11. Object relationships

A dedicated RELATED_OBJECTS field is not included in AvH-IDS v0.1.

Relationships may be represented through ordinary links in website content.

## 12. File identification

Canonical ID:

`AvH-DOC-00042`

Recommended filename:

`AvH-DOC-00042_F1-Technical-Regulations.pdf`

Rules:

- The complete ID must appear at the beginning of the filename.
- The ID must not be shortened.
- The original file extension must be preserved.
- The filename suffix should be descriptive.

## 13. Metadata representation

The system uses:

- YAML for metadata and frontmatter.
- Markdown for text documents and content.
- MDX where interactive or embedded components are required.
- JSON for machine-readable exports and data exchange.

Metadata validation is performed through a centralized schema.

## 14. Versioning and future extensions

This document defines AvH-IDS v0.1.

Future changes may introduce additional TYPE values, SUBJECT values, metadata fields and validation rules.

Existing identifiers must remain unchanged when the classification system evolves.

---

**End of AvH-IDS Standard v0.1**