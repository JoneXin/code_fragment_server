FROM node:16-alpine

WORKDIR /app

COPY ./package*.json ./

# 配置登录token
# RUN echo -e '//115.236.65.98:7001/:_authToken=001da499-ceea-47a3-9ce6-a35998f0a807' >> ~/.npmrc

RUN npm i  -f

COPY . .

EXPOSE 8888

CMD ["npm","run","start"]