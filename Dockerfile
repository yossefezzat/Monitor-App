FROM node:14.18.0

WORKDIR /code

COPY package.json /code/package.json

COPY package-lock.json /code/package-lock.json

RUN npm install

COPY . /code

EXPOSE 3000

CMD ["npm", "run", "start"]