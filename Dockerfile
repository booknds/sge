#DOCKER-VERSION 1.8.0
FROM hkmconsultingllc/tomcat7


# INSTALL TAR
RUN yum install -y zip;yum install -y unzip

# CONFIGURE JDK
ADD sgt.zip /tmp/
RUN unzip /tmp/sgt.zip -d /opt/app/apache-tomcat-7.0.55/webapps/

# EXPOSE PORT NUMBER
EXPOSE 8080

VOLUME /opt/app/apache-tomcat-7.0.55/webapps

CMD /opt/app/apache-tomcat-7.0.55/bin/catalina.sh run

