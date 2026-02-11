FROM registry.access.redhat.com/ubi9/nodejs-24-minimal@sha256:53b4596d91968958867d63289dca2712c667f0b5b6be98316a2865cd909f2b0d AS builder
USER 1001
WORKDIR ${APP_ROOT}/repo
COPY --chown=1001:0 . .
ARG GIT_COMMIT
ENV GIT_COMMIT=${GIT_COMMIT}
ARG GIT_TAG
ENV GIT_TAG=${GIT_TAG}
RUN node .yarn/releases/yarn-4.12.0.cjs install --immutable && node .yarn/releases/yarn-4.12.0.cjs build:all

FROM scratch
COPY --from=builder /opt/app-root/repo/apps/agent-ui/dist /apps/agent-ui/dist

