# Pull base image.
FROM yvnio/nginx

MAINTAINER Grigor Khachatryan <g@yvn.io>

ENV environment dev

# Install Global node packages
RUN npm install -g gulp

RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d

# Pull project
COPY ./ /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
RUN npm i
RUN npm run ${environment}

# Define default command.
CMD ["nginx", "-g", "daemon off;"]

# Expose ports.
EXPOSE 80 443