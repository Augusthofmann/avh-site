# AvH Technical Architecture v0.1

**Project:** AvH — August von Hofmann  
**Version:** 0.1  
**Status:** Draft

---

## 1. Project overview

AvH is a personal website and digital archive combining:

- Experimental web design.
- Personal portfolio.
- Engineering and research projects.
- Digital publications and journal.
- Structured archive based on AvH-IDS.

The platform consists of a public website and a private administrative interface.

The system should remain simple, maintainable and extensible.

## 2. Technology stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | Astro | Website generation and application |
| Language | TypeScript | Application and schema logic |
| Styling | Custom CSS | Visual design system |
| Content | Markdown / MDX | Text content and publications |
| Metadata | YAML | Object metadata |
| Validation | Zod | Metadata validation |
| Search | Pagefind | Static website search |
| Hosting | Vercel | Deployment and hosting |
| Database / Authentication | TBD | Private administration and user access |
| File storage | Cloudflare R2 | Digital archive storage |
| Version control | GitHub | Source code and content repository |
| CI/CD | GitHub integration with Vercel | Automated builds and deployment |

## 3. Application architecture

The application is divided into two primary areas.

### 3.1 Public website

The public website contains:

| Section | Purpose |
|---|---|
| Home | Main landing page |
| Projects | Selected projects and portfolio |
| Archive | Full AvH-IDS catalogue |
| Journal | Blog and publications |
| About | Biography and background |
| CV | Curriculum vitae |

Projects and Archive are separate concepts:

- Projects presents selected work.
- Archive provides access to registered objects.

### 3.2 Administrative interface

The administrative interface is part of the same AvH application.

Proposed route structure:

- `/admin/login`
- `/admin/dashboard`
- `/admin/objects`
- `/admin/objects/new`
- `/admin/objects/[id]`
- `/admin/media`
- `/admin/users`
- `/admin/settings`

### 3.3 Administrative functionality

The initial administration system should support:

- Creating objects.
- Editing metadata.
- Automatic ID generation.
- Uploading files.
- Editing Markdown content.
- Previewing publications.
- Publishing and unpublishing objects.
- Changing STATUS and CLASSIFICATION.
- Managing invited users.
- Viewing basic change history.

The editor should support Markdown editing. A visual editing mode may be introduced as part of the CMS implementation.

## 4. Content architecture

GitHub is the primary source of truth for website source code, Markdown content and YAML metadata.

Content is stored in the repository and processed during the Astro build.

The administrative interface should write content and metadata through GitHub integration.

The exact implementation of GitHub API permissions and commit management is TBD.

## 5. File storage

Cloudflare R2 is used for uploaded archive files.

Examples:

- PDF documents.
- Images and photographs.
- Videos.
- CAD models.
- Technical drawings.
- Datasets.
- Archives.

Metadata remains in the GitHub repository.

R2 stores the actual file objects.

The website must not expose private files through unrestricted public URLs.

Private file access must be authorized by server-side logic.

## 6. Build and rendering strategy

The public website should use static generation wherever practical.

Astro Content Collections process Markdown and YAML metadata.

Zod schemas validate metadata during the build.

Invalid metadata should fail validation and prevent deployment.

Server-side functionality is required for administrative operations, authentication and protected file access.

Astro's Vercel integration will be used where server rendering or server endpoints are necessary.

## 7. Search

Pagefind provides static search without requiring a dedicated search backend.

The search index is generated during website builds.

Search should support:

- Object ID.
- Title.
- Description.
- Tags.
- Public archive content.

Private content must not be included in the public search index.

## 8. Authentication and access

The administrative interface is private.

Access is granted to the owner and invited users.

Free public registration is not required.

An authentication provider must support invited accounts and server-side session verification.

Supabase Auth is a proposed implementation option, subject to final configuration.

The owner retains full control over administrative access.

## 9. Content publication workflow

The intended workflow is:

1. Create an object.
2. Generate its ID.
3. Enter metadata.
4. Upload associated files if needed.
5. Save the object as DRAFT.
6. Preview the content.
7. Publish the object.
8. Update DATE_PUBLISHED on its first publication.
9. Rebuild and deploy the public website.

Subsequent edits should not overwrite the first publication date.

The exact draft-preview-publish implementation remains TBD.

## 10. Repository structure

Proposed initial structure:

```text
avh/
├── public/
│   ├── fonts/
│   ├── graphics/
│   └── icons/
│
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── projects/
│   │   ├── archive/
│   │   ├── journal/
│   │   ├── about/
│   │   ├── cv/
│   │   └── admin/
│   │
│   ├── content/
│   │   ├── documents/
│   │   ├── projects/
│   │   ├── journal/
│   │   └── registry/
│   │
│   ├── components/
│   ├── styles/
│   └── lib/
│       ├── ids/
│       ├── search/
│       └── utils/
│
├── schemas/
│   └── avh-ids/
│
├── scripts/
│   ├── validate-ids.ts
│   └── generate-registry.ts
│
├── docs/
│   ├── AvH-IDS-v0.1.md
│   └── AvH-Architecture-v0.1.md
│
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

This is a proposed initial structure and may be adjusted during implementation.

## 11. Implementation phases

### Phase 1 — Foundation
- Initialize Astro and TypeScript.
- Configure Custom CSS.
- Configure Markdown and Content Collections.
- Create AvH-IDS Zod schema.
- Implement metadata validation.

### Phase 2 — Identification system
- Implement ID generation.
- Implement uniqueness validation.
- Create object metadata templates.
- Implement registry generation.

### Phase 3 — Public website
- Create shared layouts and components.
- Implement Home, Projects, Archive, Journal, About and CV.
- Integrate Pagefind.
- Apply AvH visual identity.

### Phase 4 — File storage
- Configure Cloudflare R2.
- Implement file upload.
- Implement public and private file access.

### Phase 5 — Administration
- Configure authentication.
- Implement invited-user access.
- Create dashboard and object management.
- Implement editing and preview.
- Implement publication workflow.

### Phase 6 — Deployment
- Connect GitHub repository to Vercel.
- Configure environment variables.
- Configure production storage.
- Test builds and deployment.
- Verify private content protection.

## 12. Architectural principles

1. Prefer a simple implementation over unnecessary infrastructure.
2. Keep public pages statically generated whenever possible.
3. Use server-side logic only where required.
4. Keep metadata validation centralized.
5. Treat GitHub as the source of truth for content.
6. Keep uploaded archive files in R2.
7. Never expose private content through public indexes or endpoints.
8. Preserve immutable object identifiers.
9. Avoid microservices at the initial stage.
10. Introduce additional complexity only when a real requirement appears.

---

**End of AvH Technical Architecture v0.1**