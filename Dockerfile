FROM paasRegistry:5000/library/tomcat8.5.32:jdk1.7.0_71

MAINTAINER liaohw liaohw@163.com

WORKDIR /usr/local/apache-tomcat-8.5.32/

COPY ./zhyyt_front/dist /usr/local/apache-tomcat-8.5.32/webapps/zhyyt_front
CMD ./bin/catalina.sh jpda run
