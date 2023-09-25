# Sử dụng node image version 14.x.x
FROM node:16.16.0 as builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy tất cả các file cần thiết vào thư mục làm việc
COPY . .



# Cài đặt các dependencies
RUN npm install -f

# Build production-ready Angular app
RUN npm run build --prod

# Sử dụng nginx image cho runtime
FROM nginx:alpine

# Copy built files từ builder stage vào trong container
COPY --from=builder /app/dist/StoreManagement /usr/share/nginx/html

# Copy file cấu hình nginx từ thư mục local vào trong container
COPY ./nginx.conf /etc/nginx/nginx.conf

# Mở port 80 cho truy cập web
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]