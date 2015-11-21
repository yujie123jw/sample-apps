### **example-sinatra-tokumx**

#### using on your local machine
* Have your **mongo tokumx** app running
* `cd to/app/directory`
* `bundle install`
* `rackup` to start app locally 

#### To bind **example-sinatra-tokumx** app to tokumx app from package (actual db server app) in cluster:

* Create app in your cluster `apc app create toku-sinatra`

* Create tokumx app from tokumx package `apc app from package toku-app -p /apcera/pkg/packages::tokumx-2.0.1 -dr --start-cmd 'mongod --dbpath=/data/db' -m 1G -d 1G`

* Add port `apc app update toku-app -pa 27017`, start it `apc app start toku-app`

* Link two jobs with link name **tokumx** so it creates correct TOKUMX_URI envar
`apc job link toku-sinatra -to toku-app -n tokumx`

* Start example-sinatra-tokumx `apc app start toku-sinatra`

* Done!
