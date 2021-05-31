#========================================================================#
#============================ Base - Stage ==============================#
#========================================================================#

# STAGE - 1
# Base Stage - creates a base for further stages to build
# Uses Node js image
# Essential tools needed for all stages are installed here
# also the steps that will be common in all stages
# This will never be built into its own image

FROM node:14.17.0-alpine3.10 as base
# Add build arguments with default values. 
ARG projectName=inversify-graphql-example
ARG appRootDir=/app
ARG appSrcDir=$appRootDir/$projectName

# Add necessary image lables aka image metadata 
LABEL org.opencontainers.image.author="sankalp kataria"
LABEL org.opencontainers.image.title="Docker file for inversify-graphql-example"
LABEL org.opencontainers.image.nodeVersion=$NODE_VERSION
# Add build tools need for packages that require building(example, bcrypt, argon, etc)
# Note: - If there are no such packages, this can be removed.
RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && mkdir -p $appSrcDir \
    && chown -R node:node $appRootDir

WORKDIR $appRootDir

# Change user to node(already created by node official image) which is less privileged.
# By default the container will use root user but not after this.
USER node
# Copy only package files and add node user as owner since we'll be using this file as user node
COPY --chown=node:node package*.json .
# CI here means Continuous integration
# npm ci will only install production dependencies
# And it is important to clear the cache to optimize build time and size
RUN npm ci \
    && npm cache clean -f
# Switch back to root user to remove added build dependencies
# Note: - If there are no such packages, this can be removed.
USER root
RUN apk del build-dependencies


#========================================================================#
#============================= Dev - Stage ==============================#
#========================================================================#


# STAGE - 2
# Dev Stage - Stage extended from base to be only used for local development.
# Development only tools and dependecies are installed here
# This stage will also generally have bind mounts for development
FROM base as dev
# Set Node environment variable as development
ENV NODE_ENV=$NODE_ENV
# Set node module bin path as environment variable to be able to run node module commands
ENV PATH $appRootDir/node_modules/.bin/:$PATH
# Expose ports for development
EXPOSE 80
EXPOSE 9229
USER node
# Install development dependencies and clear cache
RUN npm install --only=development \
    && npm cache clean -f
WORKDIR $appSrcDir
# Use nodemon, Avoid using npm script to be more clear as to whats actually being run.
# This will read configuration from nodemon.json present in the project.
CMD [ "nodemon" ]



#========================================================================#
#=========================== Builder - Stage ============================#
#========================================================================#

# STAGE - 3
# builder Stage - Stage extended from base to be used as an intermediate stage for prod.
# Tools and dependecies for creating build/bundle are installed here
# This stage will never be built into its own image
FROM base as builder
# Set node module bin path as environment variable to be able to run node module commands
ENV PATH $appRootDir/node_modules/.bin/:$PATH
USER node
# Install development dependencies and clear cache
RUN npm install --only=development \
    && npm cache clean -f
WORKDIR $appRootDir
# Copy all files and add node user as owner since we'll be using this file as user node
COPY --chown=node:node . .
RUN npm run build


#========================================================================#
#============================= Prod - Stage =============================#
#========================================================================#


# STAGE - 4
# Prod Stage - Stage extended from base which would be used to run the bundle created by builder stage
FROM base as prod
EXPOSE 80
USER node
WORKDIR $appRootDir

# NOTE: -
# Provide environment variables in a secure way
# This example loads the environment variables through docker-compose file
# which is not secure as the environment variables can be seen via inspect command
# Hence, more secure practices should be used for production apps

# Copy all necessary resources like build/bundle files from builder stage. 
COPY --from=builder --chown=node:node $appRootDir/health-check.js .
COPY --from=builder --chown=node:node $appRootDir/dist .
# A running container doesn't always mean that our app is also running.
# hence, Add health check to ensure.
# Best practice is to not use curl or any other tool because 
# that is not considered good for security. 
# So, add a custom health check in our app and use that.
HEALTHCHECK --interval=30s --timeout=30s \
    --start-period=30s --retries=3 \
    CMD node ./health-check.js
# Use node executable instead of using npm script.
CMD [ "node", "bundle.js" ]

# Note: - for security, docker hardening can be done.
# https://gist.github.com/jumanjiman/f9d3db977846c163df12
# shows a script for alpine images
