FROM node:16
COPY ./ /app
WORKDIR /app
RUN npm install

EXPOSE 3000
ENTRYPOINT [ "node" ]
CMD [ "index.js" ]


