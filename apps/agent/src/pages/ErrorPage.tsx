import React from "react";
import { css, keyframes } from "@emotion/css";
import {
  Bullseye,
  Card,
  Button,
  Content,
  ButtonProps,
  Backdrop,
  EmptyState,
  EmptyStateBody,
  EmptyStateActions,
  EmptyStateFooter,
  Icon,
} from "@patternfly/react-core";
import { WarningTriangleIcon, ErrorCircleOIcon } from "@patternfly/react-icons";
import globalWarningColor100/* CODEMODS: you should update this color token, original v5 token was global_warning_color_100 */ from "@patternfly/react-tokens/dist/esm/t_temp_dev_tbd";
import globalDangerColor100/* CODEMODS: you should update this color token, original v5 token was global_danger_color_100 */ from "@patternfly/react-tokens/dist/esm/t_temp_dev_tbd";
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
          
          
        >
          <EmptyState>
            <EmptyStateBody>
              <Icon
                className={classes.icon}
                size="xl"
              >
                {parseInt(code) < 500 ? (
                  <WarningTriangleIcon color={globalWarningColor100.value} />
                ) : (
                  <ErrorCircleOIcon color={globalDangerColor100.value} />
                )}
              </Icon>
              <Content>
                <Content component="h1">{code}</Content>
                <Content component="h2">{message}</Content>
                {additionalDetails && <Content component="p">{additionalDetails}</Content>}
              </Content>
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
