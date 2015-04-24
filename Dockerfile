FROM node:0.10

ADD . /code
WORKDIR /code

ENV PATH node_modules/.bin:$PATH

CMD ["node", "--max_old_space_size=32", "server.js", "--", "ms-contact-support"]
