FROM nubs/npm-build

ADD . /code

ENTRYPOINT []

CMD ["node", "server.js"]
