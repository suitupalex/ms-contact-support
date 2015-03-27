FROM nubs/npm-build

ADD . /code

CMD ["node", "server.js"]
