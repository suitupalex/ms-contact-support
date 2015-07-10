FROM node:0.10

ADD . /code
WORKDIR /code

ENV PATH node_modules/.bin:$PATH

# Set up UTF-8
ENV LC_CTYPE en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US

CMD ["node", "--max_old_space_size=32", "server.js", "--", "ms-contact-support"]
