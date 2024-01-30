FROM nginx

RUN mkdir /frontend

WORKDIR /frontend

RUN mkdir ./build

ADD ./build ./build

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]