FROM node:latest

RUN mkdir -p /usr/src/sigrejak-test
WORKDIR /usr/src/sigrejak-test

COPY  package*.json /usr/src/sigrejak-test/

RUN npm install

COPY . /usr/src/sigrejak-test/

EXPOSE 5000

CMD [ "npm", "start" ]