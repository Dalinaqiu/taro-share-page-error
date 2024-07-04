npm run build:h5

cd ./dist
tar -zcvf dist.tar.gz ./
scp -i ~/.ssh/my_rsa_key ./dist.tar.gz root@10.19.11.183:/usr/local/ai-writer-miniprogram/