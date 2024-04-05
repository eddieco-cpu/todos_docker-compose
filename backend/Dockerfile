# 使用 Node.js 18.14.0 官方映像作為基礎
FROM node:18.14.0

# 設定工作目錄。 create backend directory (!! 創造的同時，也會進入到 app 目錄下)
WORKDIR /backend

# 複製 package.json 和 package-lock.json（如果存在）
# 優先複製 package*.json，目的為 docker 內部安裝 node_modules
COPY package*.json ./

# 安裝專案依賴項
RUN npm install

# 複製專案的其餘部分到工作目錄  # .dockerignore 忽略了外部的 node_modules
COPY . .

# 應用會綁定到哪個埠 (in docker)。這裡使用 3030 (need to be the same as in app.js)
EXPOSE 3030

# 定義運行應用程式的命令
CMD ["npm", "start"]

############################################
# scripts

# 
# docker build -t todosbackend .

#
# docker run -d -p 3030:3030 todosbackend

############################################
# ports

# 
# 專案內部的 port: 3030 (docker + express server setting)

#
# 對外的 port: 3030 (api visit when docker is running)