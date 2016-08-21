###########################################################
#
# Dockerfile for pdftemplater-webservice-docker
#
###########################################################

# Setting the base to nodejs 4.5.0
FROM node:4.5.0-slim

# Maintainer
MAINTAINER Geir Gåsodden

#### Begin setup ####

# Installs git and unoconv
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y git unoconv && apt-get clean

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Env variables
ENV SERVER_PORT 3000

# Expose 3000
EXPOSE 3000

# Startup
CMD /usr/bin/unoconv --listener --server=0.0.0.0 --port=2002 & node standalone.js