import buildManifest from 'demo/package.json';

/**
 * The function returns the build-time generated version.
 * It can be overriden via the MIGRATION_PLANNER_UI_VERSION environment variable.
 */
export const getMigrationPlannerUiVersion = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    return process.env.MIGRATION_PLANNER_UI_VERSION || buildManifest.version;
  };