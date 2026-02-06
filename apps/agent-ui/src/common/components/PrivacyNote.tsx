import { Alert, AlertVariant, List, ListItem } from "@patternfly/react-core";
import type React from "react";

export const PrivacyNote: React.FC = () => {
  return (
    <Alert
      variant={AlertVariant.info}
      isInline
      title="Note about Red Hat data privacy"
      component="h3"
    >
      <List isPlain>
        <ListItem>Red Hat does not store any non-aggregated data.</ListItem>
        <ListItem>
          Red Hat does not store your vCenter credentials in any way.
        </ListItem>
      </List>
    </Alert>
  );
};

PrivacyNote.displayName = "PrivacyNote";
