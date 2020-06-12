# CabTabAPI
CabTab API

# RUN DOCKER
1) To run locally with docker make sure you had already installed docker-ce.
2) clone the repo and do `docker build -t <tag-your-image-name> .` to build an image locally.
3) To run image locally do `docker run --name cabtab-api -d -p 8001:3001 <tagged_image_name>`.

# RUN docker-compose
1) To run project through docker-compose `docker-compose.yml` is available just trigger the command `docker-compose up` to up the containers and to down `docker-compose down`.
2) Once the container is up to resolve DNS by container name make entry in `/etc/hosts`.
3) For intial setup:
    * `docker exec -it cabtab-api npx sequelize-cli db:create`
    * `docker exec -it cabtab-api npx sequelize-cli db:migrate`
    * `docker exec -it cabtab-api npx sequelize-cli db:seed:all`
