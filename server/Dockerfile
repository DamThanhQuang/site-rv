FROM node:20-alpine

WORKDIR /app

# Cài đặt các công cụ biên dịch cần thiết cho bcrypt
RUN apk add --no-cache make gcc g++ python3

# Chỉ sao chép package.json trước
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sau khi cài đặt xong, xóa bcrypt và cài đặt lại
RUN npm uninstall bcrypt && npm install bcrypt

# Sao chép source code
COPY . .

EXPOSE 3001

# Development mode
CMD ["npm", "run", "start:dev"]