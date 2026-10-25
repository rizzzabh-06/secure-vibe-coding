export type ResourceLink = { label: string; href: string }

export type Snippet = {
  label: string
  variant: "vulnerable" | "safer"
  lang: string
  code: string
  note?: string
}

export type Vulnerability = {
  id: string
  number: string
  title: string
  short: string
  priority?: string
  what: string[]
  why?: string
  snippets?: Snippet[]
  mistakes?: string[]
  detect: string | string[]
  fix: string | string[]
  reading: ResourceLink[]
}

export const vulnerabilities: Vulnerability[] = [
  {
    id: "broken-access-control",
    number: "01",
    title: "Broken access control: IDOR and BOLA",
    short: "The server checks who you are, but not what you may touch.",
    priority: "High priority",
    what: [
      "Broken access control occurs when an application fails to enforce what a user is allowed to do. IDOR, or Insecure Direct Object Reference, is a common example. BOLA, or Broken Object Level Authorization, is the API security term for a related class of flaw.",
      "Imagine an application where a user can retrieve a note using `/api/notes/501`. If changing the identifier to `502` returns somebody else's note, the server may be authenticating users without checking their permissions on the requested object.",
    ],
    why: "The implementation may check that a user is logged in but forget to check ownership. It may also rely on hidden buttons, frontend route guards, or user IDs supplied by the client.",
    detect: [
      "Create two test accounts with separate data.",
      "Try accessing Account A's records while authenticated as Account B.",
      "Check read, update, delete, export, and other sensitive operations.",
      "Review whether authorization is enforced in the backend.",
    ],
    fix: [
      "Enforce authorization on the server for every protected operation.",
      "Scope database queries to the authenticated user's permitted records.",
      "Check tenant membership and resource ownership where applicable.",
      "Add negative tests proving that unauthorized requests fail.",
    ],
    reading: [
      {
        label: "PortSwigger: Access control vulnerabilities",
        href: "https://portswigger.net/web-security/access-control",
      },
    ],
  },
  {
    id: "injection",
    number: "02",
    title: "Injection: SQL, command injection, and XSS",
    short: "Untrusted data changes the meaning of a query, command, or page.",
    what: [
      "Injection occurs when untrusted data changes the meaning of a query, command, or executable content. SQL injection can alter database operations, command injection can affect operating-system commands, and cross-site scripting (XSS) can cause malicious browser-side code to execute.",
    ],
    snippets: [
      {
        label: "An insecure pattern",
        variant: "vulnerable",
        lang: "python",
        code: `query = "SELECT * FROM users WHERE name = '" + name + "'"`,
        note: "This constructs SQL by concatenating user input.",
      },
      {
        label: "A safer pattern",
        variant: "safer",
        lang: "python",
        code: `cursor.execute(
    "SELECT * FROM users WHERE name = ?",
    (name,)
)`,
        note: "The placeholder syntax varies by database driver. Use the parameterized-query API supported by your database library.",
      },
    ],
    detect: [
      "Look for dynamically constructed SQL and shell commands.",
      "Search for unsafe rendering of untrusted HTML.",
      "Use static analysis and test inputs in an authorized lab.",
      "Review whether the framework's safe APIs are being used correctly.",
    ],
    fix: [
      "Use parameterized queries.",
      "Avoid shell execution where possible.",
      "Use context-appropriate output encoding and safe DOM APIs.",
      "Treat validation as an additional layer, not a replacement for safe query construction.",
    ],
    reading: [
      {
        label: "PortSwigger: SQL injection",
        href: "https://portswigger.net/web-security/sql-injection",
      },
      {
        label: "PortSwigger: Cross-site scripting",
        href: "https://portswigger.net/web-security/cross-site-scripting",
      },
    ],
  },
  {
    id: "secrets",
    number: "03",
    title: "Hardcoded secrets and exposed credentials",
    short: "A privileged key ends up in a bundle, a repository, or its history.",
    what: [
      "Secrets include API tokens, private keys, database passwords, signing keys, and service credentials. If privileged secrets are embedded in frontend bundles or committed to a repository, other people may be able to use them.",
    ],
    snippets: [
      {
        label: "An insecure pattern",
        variant: "vulnerable",
        lang: "typescript",
        code: `const API_KEY = "real-production-secret";`,
        note: "Putting a secret in a frontend environment variable does not make it private if the build process embeds it in browser-accessible code.",
      },
    ],
    detect: [
      "Scan the repository using Gitleaks or Trivy.",
      "Inspect frontend build output for privileged credentials.",
      "Check Git history when a secret has previously been committed.",
      "Review permissions granted to service keys.",
    ],
    fix: [
      "Store secrets in an appropriate server-side configuration or secrets manager.",
      "Use least-privilege credentials.",
      "Rotate credentials that may have been exposed.",
      "Use safe placeholders in examples and documentation.",
    ],
    reading: [
      {
        label: "Gitleaks documentation",
        href: "https://github.com/gitleaks/gitleaks",
      },
      {
        label: "OWASP Secrets Management Cheat Sheet",
        href: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html",
      },
    ],
  },
  {
    id: "authentication",
    number: "04",
    title: "Authentication and session mistakes",
    short: "Identity, session handling, and authorization get blurred together.",
    what: [
      "Authentication establishes who a user is. Session management and token validation maintain that identity across requests. Authorization determines what that identity may do.",
      "These are related but separate security responsibilities.",
    ],
    mistakes: [
      "Trusting a role stored only in frontend state.",
      "Accepting JWTs without verifying their signatures and required claims.",
      "Storing passwords using fast general-purpose hashes instead of suitable password-hashing algorithms.",
      "Omitting rate limits on login and OTP verification.",
      "Misconfiguring cookie security or session expiration.",
    ],
    detect: [
      "Review login, logout, token issuance, refresh, and expiration flows.",
      "Test unauthenticated and unauthorized requests separately.",
      "Verify JWT signature, issuer, audience, expiration, and allowed algorithms as appropriate to the application.",
      "Check password hashing and session-cookie configuration.",
    ],
    fix: "Prefer maintained authentication libraries and established identity providers. Keep authorization checks separate from token validation, protect sessions, and add rate limiting where needed.",
    reading: [
      {
        label: "OWASP Authentication Cheat Sheet",
        href: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html",
      },
      {
        label: "OWASP Session Management Cheat Sheet",
        href: "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html",
      },
    ],
  },
  {
    id: "misconfiguration",
    number: "05",
    title: "Security misconfiguration and error handling",
    short: "Correct logic, exposed through unsafe defaults and verbose errors.",
    what: [
      "An application may have correct business logic but still expose unnecessary information or access through insecure configuration.",
      "Examples include production debug mode, overly permissive CORS, default credentials, verbose stack traces, or excessive service permissions.",
    ],
    detect: [
      "Review production environment settings.",
      "Inspect response headers and error responses.",
      "Check CORS allowlists, database privileges, and debug settings.",
      "Scan supported configuration files with a tool such as Trivy.",
    ],
    fix: "Use secure production defaults, restrict cross-origin access to required origins, return safe external errors, and keep diagnostic details in protected logs.",
    reading: [
      {
        label: "OWASP Security Misconfiguration",
        href: "https://owasp.org/Top10/2025/A02_2025-Security_Misconfiguration/",
      },
    ],
  },
  {
    id: "supply-chain",
    number: "06",
    title: "Vulnerable dependencies and supply-chain risks",
    short: "A package you did not write becomes part of your attack surface.",
    what: [
      "Modern applications depend on third-party libraries, build tools, plugins, and packages. A vulnerable or compromised dependency can introduce risk even if the application's own code looks reasonable.",
    ],
    detect: [
      "Run a dependency vulnerability scan.",
      "Inspect package manifests and lockfiles.",
      "Review newly suggested packages before installing them.",
      "Check package provenance and advisories when appropriate.",
    ],
    fix: "Use maintained packages, commit lockfiles, update vulnerable dependencies to appropriate fixed versions, remove unnecessary packages, and investigate breaking changes before upgrading.",
    reading: [
      {
        label: "OWASP Software Supply Chain Failures",
        href: "https://owasp.org/Top10/2025/A03_2025-Software_Supply_Chain_Failures/",
      },
    ],
  },
  {
    id: "uploads-ssrf",
    number: "07",
    title: "Unsafe file uploads and server-side request forgery",
    short: "The server trusts a file, a path, or a URL that a user controls.",
    what: [
      "File upload flaws arise when applications trust user-controlled files or paths too much. Server-side request forgery (SSRF) occurs when an attacker can influence requests made by the server to unintended destinations.",
    ],
    mistakes: [
      "Trusting a filename extension without checking the content.",
      "Accepting arbitrary URLs and fetching them from the server.",
      "Allowing users to control filesystem paths.",
      "Storing uploads in executable public directories.",
    ],
    detect:
      "Review upload handlers, URL-fetching features, path construction, file-size limits, and outbound network access. Test in a local or explicitly authorized environment.",
    fix: "Use allowlists, validate content server-side, generate safe filenames, constrain storage, enforce size limits, and restrict outbound network access to appropriate destinations.",
    reading: [
      {
        label: "OWASP File Upload Cheat Sheet",
        href: "https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html",
      },
      {
        label: "PortSwigger: SSRF",
        href: "https://portswigger.net/web-security/ssrf",
      },
    ],
  },
  {
    id: "business-logic",
    number: "08",
    title: "Missing security tests and insecure business logic",
    short: "The feature passes its tests but breaks when used out of order.",
    what: [
      "A feature can pass normal tests but fail when a user skips a workflow step, changes an object identifier, repeats a request, or performs an action in an unexpected order.",
      "Examples include trusting the client to confirm payment, allowing repeated coupon redemption, or skipping a required approval step.",
    ],
    detect: [
      "Test unauthorized actions and unexpected state transitions.",
      "Check whether payment and approval states are confirmed server-side.",
      "Test duplicate requests and relevant race conditions.",
      "Review whether tests cover failures, not just successful outcomes.",
    ],
    fix: "Enforce critical business rules on the server, validate state transitions, use appropriate database transactions and idempotency controls, and add regression tests for discovered vulnerabilities.",
    reading: [
      {
        label: "PortSwigger: Business logic vulnerabilities",
        href: "https://portswigger.net/web-security/logic-flaws",
      },
    ],
  },
]

export const owaspCategories = [
  "Broken access control",
  "Security misconfiguration",
  "Software supply-chain failures",
  "Cryptographic failures",
  "Injection",
  "Insecure design",
  "Authentication failures",
  "Software or data integrity failures",
  "Security logging and alerting failures",
  "Mishandling of exceptional conditions",
]
