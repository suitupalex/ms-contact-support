FROM node:0.10

ADD . /code
WORKDIR /code

ENV PATH node_modules/.bin:$PATH

CMD ["node", "server.js", "--", "ms-contact-support"]
