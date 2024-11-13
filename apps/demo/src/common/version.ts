import buildManifest from 'demo/package.json';

/**
 * The function returns the build-time generated version.
 * It can be overriden via the MIGRATION_PLANNER_UI_VERSION environment variable.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getMigrationPlannerUiVersion = () => {
     
    return process.env.MIGRATION_PLANNER_UI_VERSION || buildManifest.version;
  };