FROM centos
RUN yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
RUN yum -y install nodejs npm 
EXPOSE 8080
ENV PORT 8080 
ENV MYSQL_URI "mysql://root:sql@mysqldev:3306/"
ADD * /
CMD cd /;npm install;node main.js


