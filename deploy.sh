#!/bin/bash

#------------------------------改成自己的---------------------------------------------
# 服务端仓库名称
server_name="code_fragment_server"
# 前端仓库名称
front_name="code_fragment_fe"
# 前后端所在系统, 目录规范如下：
# 例如:1,业务系统：[leaper][业务]     [系统名]        [仓库名]
#               /leaper/roll/pmp_data_anaylse/pmp_service_backend
#               /leaper/roll/pmp_data_anaylse/pmp_service_frontend
#               /leaper/roll/pmp_data_anaylse/pmp_roll_etl
# 例如:2,基础服务：[leaper]  [基础服务]     [服务名]
#               /leaper/base_service/kafka_zookeeper
system_dir="/leaper/code_fragment/code_fragment_server"
#-----------------------------------------------------------------------------------


# 服务端仓库地址 = 服务端所在系统 目录 / 服务端镜像名称
server_repos_dir=$system_dir/$server_name
front_repos_dir=$system_dir/../$front_name/$front_name

# 拷贝前端dist[存在前端]
if [[ -z $front_name ]];
then
    echo "无前端代码 copy!"
else
    rm -rf $server_repos_dir/public/*
    cp -rn $front_repos_dir/dist/* $server_repos_dir/public/
fi

# 如果有【具体代码】特殊的需要初始化的东西

# spug需要初始化的
if [[ $server_name == "spug" ]]
then
    chmod +x $server_repos_dir/script/docker/entrypoint.sh
    chmod +x $server_repos_dir/script/docker/init_spug
fi



# 删除老版本容器
docker compose -f $server_repos_dir/docker-compose.yml stop
docker compose -f $server_repos_dir/docker-compose.yml rm -f

# 构建服务端镜像
docker rmi $server_name:latest -f
docker image build -f $server_repos_dir/Dockerfile -t $server_name:latest $server_repos_dir

# 启动新版本容器
docker compose -f $server_repos_dir/docker-compose.yml up -d