#!/bin/bash
apc app delete nodechat --batch | true
apc package delete nodechat --batch | true
apc service delete mysqldatabase-service --batch | true
apc provider delete mysqldatabase-provider --batch | true
apc app delete mysqldatabase --batch | true
apc docker run mysqldatabase -i rusher81572/mysql-dev --port 3306
sleep 30
apc provider register mysqldatabase-provider --job mysqldatabase -u mysql://root:sql@mysqldatabase --batch
sleep 10
apc app create nodechat --batch 
apc service create mysqldatabase-service --provider mysqldatabase-provider --job nodechat --batch
sleep 10
apc app start nodechat
