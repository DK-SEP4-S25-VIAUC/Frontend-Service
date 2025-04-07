FROM node:22

RUN apt-get update && \
    apt-get install -y git && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

ARG GIT_USER_NAME
ARG GIT_USER_EMAIL

RUN apt-get update && \
    apt-get install -y git && \
    rm -rf /var/lib/apt/lists/* && \
    if [ -n "$GIT_USER_NAME" ] && [ -n "$GIT_USER_EMAIL" ]; then \
    su - node -c "git config --global user.name '$GIT_USER_NAME' && git config --global user.email '$GIT_USER_EMAIL'"; \
    fi
USER node

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]