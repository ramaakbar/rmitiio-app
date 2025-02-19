FROM node:22-alpine AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/app

COPY ./client .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
RUN pnpm build

FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

COPY --from=builder /usr/app/dist .
COPY --from=builder /usr/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]