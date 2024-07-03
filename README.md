# 關於專案

> 本專案前後端分離。
> 由 frontend 以及 backend 兩個專案組成。
> 前端使用 React.js 開發並由 Express.js 提供服務，
> 而後端則使用 Express.js 提供 API 服務。

## 專案結構

```js
/**
    root
    ├── frontend
    │ ├── Dockerfile
    │ ├── package.json
    │ ├── server.js
    │ ├── public
    │ ├── src
    │ └── ...
    ├── backend
    │ ├── Dockerfile
    │ ├── package.json
    │ ├── src
    │ └── ...
    └── docker-compose.yml
 */
```

## 專案細節

### 前端

`frontend` 目錄包含 React.js 應用程式、Express.js 提供服務，及其 Dockerfile，用於將前端伺服器容器化。

### 後端

`backend` 目錄包含 Express.js 應用程式，用於提供 API 服務。該目錄也包含用於將後端伺服器容器化的 Dockerfile。

### Docker Compose

根目錄包含一個 `docker-compose.yml` 文件，用於協調前端和後端服務。

## 先決條件

- Docker
- Docker Compose

## 快速開始

要在本地運行此專案，請按照以下步驟操作：

1. 從 GitHub 克隆此存儲庫：

```bash
# git clone
```

2. 使用 Docker Compose 構建並啟動服務：

```sh
   docker-compose up -d --build
```

3. 訪問應用程式：

   - 前端：`http://localhost:3005`
   - 後端 API：`http://localhost:3030`

## 其他補充

如需更多資訊，
請參閱 `frontend` 和 `backend` 目錄中的 README.md 文件、 Dockerfile 文件。
