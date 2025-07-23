import React from "react";
import { css, keyframes } from "@emotion/css";
import {
  Bullseye,
  Card,
  Button,
  TextContent,
  Text,
  ButtonProps,
  Backdrop,
  EmptyStateIcon,
  EmptyState,
  EmptyStateBody,
  EmptyStateActions,
  EmptyStateFooter,
} from "@patternfly/react-core";
import { WarningTriangleIcon, ErrorCircleOIcon } from "@patternfly/react-icons";
import globalWarningColor100 from "@patternfly/react-tokens/dist/esm/global_warning_color_100";
import globalDangerColor100 from "@patternfly/react-tokens/dist/esm/global_danger_color_100";
import { useLocation, useParams } from "react-router-dom";

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`;

const classes = {
  icon: css({
    fontSize: "6rem",
    animation: `${bounce} 1s ease infinite`,
    transformOrigin: "center bottom",
  }),
} as const;

type Props = {
  code?: string;
  message?: string;
  additionalDetails?: string;
  /** A list of actions, the first entry is considered primary and the rest are secondary. */
  actions?: Array<Omit<ButtonProps, "variant">>;
};

const ErrorPage: React.FC<Props> = (props) => {
  const params = useParams();
  const location = useLocation();

  const {
    code = params.code ?? "500",
    message = location.state?.message ?? "That's on us...",
    additionalDetails,
    actions = [],
  } = props;
  const [primaryAction, ...otherActions] = actions;

  return (
    <>
      <Backdrop style={{ zIndex: 0 }} />
      <Bullseye>
        <Card
          style={{ width: "36rem", height: "38rem", justifyContent: "center" }}
          isFlat
          isRounded
        >
          <EmptyState>
            <EmptyStateBody>
              <EmptyStateIcon
                className={classes.icon}
                icon={
                  parseInt(code) < 500 ? WarningTriangleIcon : ErrorCircleOIcon
                }
                color={
                  parseInt(code) < 500
                    ? globalWarningColor100.value
                    : globalDangerColor100.value
                }
              />
              <TextContent>
                <Text component="h1">{code}</Text>
                <Text component="h2">{message}</Text>
                {additionalDetails ?? <Text>{additionalDetails}</Text>}
              </TextContent>
            </EmptyStateBody>

            {actions.length > 0 && (
              <EmptyStateFooter>
                <EmptyStateActions>
                  <Button variant="primary" {...primaryAction} />
                </EmptyStateActions>
                <EmptyStateActions>
                  {otherActions.map(({ key, ...props }) => (
                    <Button key={key} variant="secondary" {...props} />
                  ))}
                </EmptyStateActions>
              </EmptyStateFooter>
            )}
          </EmptyState>
        </Card>
      </Bullseye>
    </>
  );
};

ErrorPage.displayName = "ErrorPage";

export default ErrorPage;
