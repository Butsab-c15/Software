# Sneaker2Hand / EGO - Demo-compatible Software

เวอร์ชันนี้นำ flow หลักจาก Demo มาปรับใช้กับ Software โดยยังคงใช้ MySQL เป็นแหล่งข้อมูลสินค้า

## สิ่งที่เพิ่ม/แก้
- รองรับ `/shop/product/:id` และ `/shop/:id`
- Shop ใช้ MySQL และรองรับ Brand / Size / Condition / Price / Search
- เพิ่ม `/checkout`, `/checkout/:id`, `/qr-payment`
- Buy Now / Add to Cart มี flow ตรวจ Login แบบ Demo
- Login รองรับ redirect + action และตั้ง `userEmail` ใน browser
- Register รองรับ redirect กลับ Login
- Navbar มี Cart badge, Login/User menu และ Search
- เพิ่ม `database/schema.sql`
- Seed ใช้ `ON DUPLICATE KEY UPDATE` จึงรันซ้ำเพื่ออัปเดตสินค้าได้

## วิธีติดตั้ง
1. เปิด MySQL Workbench
2. เปิด `database/schema.sql` แล้ว Run
3. ตรวจ `database/db.js` ให้ `host`, `user`, `password`, `database` ตรงกับเครื่อง
4. เปิด Terminal ในโฟลเดอร์นี้แล้วรัน `npm install`
5. รัน `npm run seed` เพื่อใส่สินค้า 47 รายการ
6. รัน `npm start`
7. เปิด `http://localhost:3000`

## หมายเหตุ
ระบบ Login/Register และ Cart ในเวอร์ชันนี้ยังใช้แนวทาง Demo คือสถานะผู้ใช้และตะกร้าอยู่ใน `localStorage` ไม่ใช่ระบบ Authentication/Order database เต็มรูปแบบ
