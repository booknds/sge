#DOCKER-VERSION 1.7.0
FROM centos:centos7

# INSTALL WGET
RUN yum install -y wget

# INSTALL TAR
RUN yum install -y tar

# DOWNLOAD JDK
RUN cd /opt;mkdir app;cd app;wget https://s3.amazonaws.com/HKM-Oracle/jdk-7u67-linux-x64.tar.gz

# CONFIGURE JDK
RUN cd /opt/app;gunzip jdk-7u67-linux-x64.tar.gz
RUN cd /opt/app;tar xvf jdk-7u67-linux-x64.tar
RUN alternatives --install /usr/bin/java java /opt/app/jdk1.7.0_67/bin/java 2

# CONFIGURE TOMCAT7
RUN cd /opt/app;wget https://s3.amazonaws.com/hkmstarter/apache-tomcat-7.0.55.tar.gz
RUN cd /opt/app;gunzip apache-tomcat-7.0.55.tar.gz;tar xvf apache-tomcat-7.0.55.tar
RUN chmod -R 755 /opt/app/

# SETUP ADMIN USER
RUN cd /opt/app/apache-tomcat-7.0.55/conf; rm -f tomcat-users.xml; wget https://s3-us-west-2.amazonaws.com/hkmwso2/tomcat-users.xml

# SET JAVA_HOME
ENV JAVA_HOME /opt/app/jdk1.7.0_67

# EXPOSE PORT NUMBER
EXPOSE 8080

#VOLUME /opt/app/apache-tomcat-7.0.55/webapps

CMD /opt/app/apache-tomcat-7.0.55/bin/catalina.sh run

