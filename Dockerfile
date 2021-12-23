FROM keymetrics/pm2:14-buster
RUN mkdir -p /home/blog-server
WORKDIR /home/blog-server
COPY ./ /home/blog-server
RUN npm install
ENV NPM_CONFIG_LOGLEVEL warn
EXPOSE 9000
CMD ["pm2-runtime", "start", "pm2.config.js", "--env", "production"]