// Facts the legal pages depend on. Every value in [BRACKETS] is an open placeholder
// that must be filled before launch; the Ph component renders them highlighted so
// none can slip through unnoticed. Grep the repo for "[" in this file to list them.

export const LEGAL_LAST_UPDATED = "10 October 2026";

export const LEGAL = {
  name: "[LEGAL NAME]",
  city: "[CITY]",
  grievanceOfficer: "[GRIEVANCE OFFICER NAME]",
  grievanceEmail: "[GRIEVANCE EMAIL]",
  // Days to purge backups after an account deletion.
  deletionDays: "[X]",
  // Days to keep server and error logs.
  logDays: "[X]",
  // Days to answer a grievance. The DPDP Rules 2025 set 90 days as the outer limit.
  grievanceDays: "[X, max 90]",
  supportResponse: "[RESPONSE TIME, e.g. two working days]",
  backendHost: "[BACKEND HOSTING PROVIDER]",
  databaseHost: "[DATABASE HOSTING PROVIDER]",
  cacheHost: "[CACHE HOSTING PROVIDER]",
} as const;
