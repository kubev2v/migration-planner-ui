export interface VMFilters {
  // Client-side filters only
  hasIssues?: boolean;
  noIssues?: boolean;
  statuses?: string[];
  clusters?: string[];
  datacenters?: string[];
  search?: string;
  diskRange?: { min: number; max?: number };
  memoryRange?: { min: number; max?: number };
  migrationReadiness?: string[];
}

/**
 * Converts VM filters to URL search params
 */
export function filtersToSearchParams(filters: VMFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.hasIssues !== undefined) {
    params.set("hasIssues", filters.hasIssues.toString());
  }

  if (filters.noIssues !== undefined) {
    params.set("noIssues", filters.noIssues.toString());
  }

  if (filters.statuses && filters.statuses.length > 0) {
    params.set("statuses", filters.statuses.join(","));
  }

  if (filters.clusters && filters.clusters.length > 0) {
    params.set("clusters", filters.clusters.join(","));
  }

  if (filters.datacenters && filters.datacenters.length > 0) {
    params.set("datacenters", filters.datacenters.join(","));
  }

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.diskRange) {
    params.set("diskRangeMin", filters.diskRange.min.toString());
    if (filters.diskRange.max !== undefined) {
      params.set("diskRangeMax", filters.diskRange.max.toString());
    }
  }

  if (filters.memoryRange) {
    params.set("memoryRangeMin", filters.memoryRange.min.toString());
    if (filters.memoryRange.max !== undefined) {
      params.set("memoryRangeMax", filters.memoryRange.max.toString());
    }
  }

  if (filters.migrationReadiness && filters.migrationReadiness.length > 0) {
    params.set("migrationReadiness", filters.migrationReadiness.join(","));
  }

  return params;
}

/**
 * Parses URL search params to VM filters
 */
export function searchParamsToFilters(
  searchParams: URLSearchParams,
): VMFilters {
  const filters: VMFilters = {};

  const hasIssues = searchParams.get("hasIssues");
  if (hasIssues !== null) {
    filters.hasIssues = hasIssues === "true";
  }

  const noIssues = searchParams.get("noIssues");
  if (noIssues !== null) {
    filters.noIssues = noIssues === "true";
  }

  const statuses = searchParams.get("statuses");
  if (statuses) {
    filters.statuses = statuses.split(",").filter(Boolean);
  }

  const clusters = searchParams.get("clusters");
  if (clusters) {
    filters.clusters = clusters.split(",").filter(Boolean);
  }

  const datacenters = searchParams.get("datacenters");
  if (datacenters) {
    filters.datacenters = datacenters.split(",").filter(Boolean);
  }

  const search = searchParams.get("search");
  if (search) {
    filters.search = search;
  }

  const diskRangeMin = searchParams.get("diskRangeMin");
  const diskRangeMax = searchParams.get("diskRangeMax");
  if (diskRangeMin !== null) {
    const min = Number.parseInt(diskRangeMin, 10);
    if (!Number.isNaN(min)) {
      filters.diskRange = { min };
      if (diskRangeMax !== null) {
        const max = Number.parseInt(diskRangeMax, 10);
        if (!Number.isNaN(max)) {
          filters.diskRange.max = max;
        }
      }
    }
  }

  const memoryRangeMin = searchParams.get("memoryRangeMin");
  const memoryRangeMax = searchParams.get("memoryRangeMax");
  if (memoryRangeMin !== null) {
    const min = Number.parseInt(memoryRangeMin, 10);
    if (!Number.isNaN(min)) {
      filters.memoryRange = { min };
      if (memoryRangeMax !== null) {
        const max = Number.parseInt(memoryRangeMax, 10);
        if (!Number.isNaN(max)) {
          filters.memoryRange.max = max;
        }
      }
    }
  }

  const migrationReadiness = searchParams.get("migrationReadiness");
  if (migrationReadiness) {
    filters.migrationReadiness = migrationReadiness.split(",").filter(Boolean);
  }

  return filters;
}

/**
 * Checks if any filters are applied
 */
export function hasActiveFilters(filters: VMFilters): boolean {
  return !!(
    filters.hasIssues !== undefined ||
    filters.noIssues !== undefined ||
    (filters.diskRange !== undefined && filters.diskRange !== null) ||
    (filters.memoryRange !== undefined && filters.memoryRange !== null) ||
    (filters.statuses && filters.statuses.length > 0) ||
    (filters.clusters && filters.clusters.length > 0) ||
    (filters.datacenters && filters.datacenters.length > 0) ||
    (filters.migrationReadiness && filters.migrationReadiness.length > 0) ||
    filters.search
  );
}
