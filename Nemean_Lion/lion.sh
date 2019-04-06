#!/bin/bash
apt-get install -y openssh-server
sed -i -e 's/#Port 22/Port 9999/g' /etc/ssh/sshd_config
service ssh restart

#lsof -Pni(list of opend file)
#systemctl status sshd
#systemctl restart sshd
#ip a(check ip)
#ssh edgar@127.0.0.1 -p2222
#vi .zshrc
#cd .ssh
