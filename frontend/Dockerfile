FROM nginx

RUN mkdir /frontend

WORKDIR /frontend

RUN mkdir ./build

ADD ./build ./build

RUN ls

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]