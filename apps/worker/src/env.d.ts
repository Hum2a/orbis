/// <reference types="@cloudflare/workers-types" />

export interface Env {
  PLANET_DO: DurableObjectNamespace;
  DEFAULT_PLANET_ID?: string;
  DATABASE_URL?: string;
  ADMIN_SECRET?: string;
}
