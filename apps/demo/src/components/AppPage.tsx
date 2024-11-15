import React from "react";
import {
  Divider,
  PageSection,
  PageBreadcrumb,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbItemProps,
  TextContent,
  Text,
  Page,
} from "@patternfly/react-core";
import {
  PageHeader,
  PageHeaderTitle,
} from "@redhat-cloud-services/frontend-components/PageHeader";
import { getMigrationPlannerUiVersion } from "#/common/version";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AppPage {
  export type Props = {
    title: React.ReactNode;
    caption?: React.ReactNode;
    breadcrumbs?: Array<BreadcrumbItemProps>;
  };
}

export const AppPage: React.FC<React.PropsWithChildren<AppPage.Props>> = (
  props
) => {
  const { title, caption, breadcrumbs, children } = props;

  return (
    <Page>
      <div id="base-page__header">
        <PageBreadcrumb>
          <Breadcrumb>
            {breadcrumbs?.map(({ key, children, ...bcProps }) => (
              <BreadcrumbItem key={key} {...bcProps}>
                {children}
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
          <div data-testid="migration-planner-ui-version" hidden>
            {getMigrationPlannerUiVersion()}
          </div>
        </PageBreadcrumb>
        <PageHeader>
          <PageHeaderTitle title={title} />
          <TextContent
            style={{ paddingBlockStart: "var(--pf-v5-global--spacer--md)" }}
          >
            <Text component="small">{caption}</Text>
          </TextContent>
        </PageHeader>
        <Divider />
      </div>
      <PageSection>{children}</PageSection>
    </Page>
  );
};

AppPage.displayName = "BasePage";
