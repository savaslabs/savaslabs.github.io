FROM starefossen/ruby-node:2-5
MAINTAINER Kosta Harlan <kosta@savaslabs.com>

WORKDIR /app

ENV BUNDLE_PATH /gems
ENV NODE_PATH /npm

COPY package.json /app/package.json
RUN npm install

COPY . /app

RUN gem install bundler
RUN bundle install

WORKDIR /app

RUN export PATH=/app/node_modules/.bin:$PATH

ENTRYPOINT ["/app/node_modules/.bin/gulp"]
CMD ["serve"]
