import { demoProjects } from "./demo-projects";

export const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export type ProjectStatus = "active" | "archived";
export type Project = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
  archived_at: string | null;
};
export type ProjectInput = { name: string; description: string; };

export class ApiError extends Error {
  constructor(public status: number, public code: string, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init: RequestInit = {}, signal?: AbortSignal): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`/api/v1/projects${path}`, {
      ...init,
      cache: "no-store",
      headers: { "Content-Type": "application/json", ...init.headers },
      signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(10000)]) : AbortSignal.timeout(10000),
    });
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new ApiError(0, "API_UNAVAILABLE", "Unable to reach the project API. Check the connection and try again.");
  }
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new ApiError(
      response.status,
      body?.error?.code ?? "API_UNAVAILABLE",
      response.status >= 500
        ? "The project API is unavailable. Please try again."
        : body?.error?.message ?? "Unable to complete the request.",
    );
  }
  if (body === null) throw new ApiError(502, "INVALID_RESPONSE", "The project API returned an invalid response.");
  return body as T;
}

const liveProjectsApi = {
  list: (status: ProjectStatus, signal?: AbortSignal) => request<{ projects: Project[]; }>(`?status=${status}`, {}, signal),
  get: (id: string, signal?: AbortSignal) => request<Project>(`/${encodeURIComponent(id)}`, {}, signal),
  create: (input: ProjectInput) => request<Project>("", { method: "POST", body: JSON.stringify(input) }),
  update: (id: string, input: ProjectInput) => request<Project>(`/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(input) }),
  archive: (id: string) => request<Project>(`/${encodeURIComponent(id)}/archive`, { method: "POST" }),
};

// Normalize demo failures to the same UI contract as HTTP errors.
async function demoCall<T>(operation: () => Promise<T>): Promise<T> {
  try { return await operation(); }
  catch (error) {
    const status = error && typeof error === "object" && "status" in error ? Number(error.status) : 400;
    throw new ApiError(status, status === 404 ? "PROJECT_NOT_FOUND" : "DEMO_ERROR", error instanceof Error ? error.message : "Unable to update the demo.");
  }
}
export const projectsApi: typeof liveProjectsApi = isDemo ? {
  list: status => demoCall(() => demoProjects.list(status)),
  get: id => demoCall(() => demoProjects.get(id)),
  create: input => demoCall(() => demoProjects.create(input)),
  update: (id, input) => demoCall(() => demoProjects.update(id, input)),
  archive: id => demoCall(() => demoProjects.archive(id)),
} : liveProjectsApi;

export function projectError(error: unknown): string {
  return error instanceof ApiError ? error.message : "Something went wrong. Please try again.";
}

export function formatProjectDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}
