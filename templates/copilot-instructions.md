# Stellar Merchant backend

## Sources of truth

- Read `../doc/arc42/` before making architectural changes.
- Keep HTTP behavior aligned with `../doc/api/openapi.yaml`.
- Apply every mandatory rule in `../doc/security/security-constraints.md`.
- Concrete implementation specifications reside in `./spec`. Read the relevant
  spec before implementing or changing a feature, and treat its acceptance
  criteria as the required test cases.
- `./spec` refines the documentation; it never overrides it. Precedence is
  security-constraints > arc42 > OpenAPI > spec > code.
- A spec describes intended behavior and may run ahead of the code. Unimplemented
  acceptance criteria are work to do, not defects.
- Follow the existing spec format: `### Requirement:` with MUST/SHOULD wording,
  **Rationale:**, and **Acceptance Criteria:**.
- Propose spec changes to THE HOOMAN before editing; do not silently rewrite a
  requirement to match the code.
- If specification and documentation disagree, or code and either disagree, stop
  and surface the conflict rather than silently choosing one.

## Stack and commands

- Kotlin/JVM 2.3, Java 25, Spring Boot 4.1, Gradle Kotlin DSL, JPA, and SQLite.
- Use the checked-in Gradle wrapper. Run tests with `./gradlew test` (or
  `gradlew.bat test` on Windows).
- Keep GraalVM native-image compatibility unless a requirement explicitly
  accepts JVM-only deployment.

## Architecture

- Keep the backend a local monolith suitable for Raspberry Pi hardware. Do not
  introduce services, brokers, cloud dependencies, or a database server.
- The backend is authoritative: validate commands, apply simulation rules, and
  persist results here. Never trust client-provided prices, permissions,
  campaign status, or simulation outcomes.
- Keep host-game character, combat, dice, and narrative rules outside this
  application.
- Use SQLite for relational state; reserve JSON for genuinely flexible rule
  configuration.
- Store multiple draft, active, or inactive game campaigns, with at most one
  active campaign visible to anonymous players.
- Process each state-changing command in one transaction. Serialize commands
  for the active campaign and deduplicate retries by unique command identifier,
  returning the original result for a duplicate.
- Advance simulation only in explicit, persisted time steps. Resolve arrival
  against the world state at arrival time.

## API and security

- Treat the OpenAPI file as the contract. Use `/api/v1`, UUID identifiers, and
  `application/problem+json` errors.
- Validate every request at the backend boundary and reject unknown or invalid
  input explicitly.
- Require backend-enforced facilitator authorization for campaign creation,
  editing, activation, and world-state changes. Anonymous players may access
  only the active campaign.
- Store passwords only as salted, slow hashes. Use protected, expiring
  facilitator sessions or cookies, rate-limit login failures, and do not reveal
  whether a user exists.
- Use parameterized persistence operations. Do not expose stack traces,
  credentials, filesystem paths, or raw database errors.
- Keep secrets and persistent data out of source control and container images.

## Working conventions

- Prefer existing Spring, Kotlin, and standard-library features over custom
  infrastructure or new dependencies.
- Implement the smallest complete vertical slice; do not scaffold speculative
  abstractions.
- Write a failing test before changing behavior, then make the smallest change
  that passes it. Cover authorization, validation, transactions, and retry
  safety at their real boundaries.
- Preserve the existing package root:
  `oli.bitsandbobs.stellarmerchant`.
- Update the OpenAPI or arc42 source document when a change intentionally alters
  its contract or an accepted architecture decision.
- If changes need to be made to the architecture, OpenAPI, or security rules, create 
  a plan document and discuss it with THE HOOMAN. Do not make unilateral changes to 
  these sources of truth.
- Implement new features only as far as the HOOMAN has specified. 
- If it seems the HOOMAN has not specified how much to implement, 
  ask for clarification before proceeding.