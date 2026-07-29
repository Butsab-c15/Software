const express = require("express");
const router = express.Router();

// 👟 สร้างข้อมูลจำลอง (Mock Data) ของรองเท้าเอาไว้ทดสอบก่อน
// เพิ่มข้อมูล size, condition, และ badgeColor เพื่อให้หน้า EJS แสดงผลได้สมบูรณ์
const mockShoes = [
  {
    id: 1,
    brand: "nike",
    name: "Nike Air Force 1",
    price: "3,500",
    size: 42,
    condition: 95,
    badgeColor: "bg-success",
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80",
  },
  {
    id: 2,
    brand: "nike",
    name: "Nike Dunk Low",
    price: "3,200",
    size: 41,
    condition: 90,
    badgeColor: "bg-secondary",
    image: "https://i.ebayimg.com/images/g/E6UAAOSwHehntlHs/s-l1600.webp",
  },
  {
    id: 3,
    brand: "adidas",
    name: "Adidas Samba",
    price: "2,700",
    size: 40,
    condition: 98,
    badgeColor: "bg-warning text-dark",
    image:
      "https://assets.adidas.com/images/w_500,f_auto,q_auto/3a4ab3dac9c1429389cd77e280f3c8e4_9366/adidas_Originals_x_Liberty_London_Samba_OG_IH9056_01_00_standard.jpg",
  },
  {
    id: 4,
    brand: "jordan",
    name: "Air Jordan 1",
    price: "4,800",
    size: 43,
    condition: 99,
    badgeColor: "bg-danger",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRABgPAMoO5u0Ra8nJDmA6g7ZRzxRI7I-AaGlcuGEqcMm4xbXofcspzwMdz&s=10",
  },
  {
    id: 5,
    brand: "newbalance",
    name: "New Balance 530",
    price: "2,900",
    size: 39,
    condition: 95,
    badgeColor: "bg-success",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT96QL0YydnLkom1gpJHhHsgomVJgDUqPO3PwU1h6tR3LgNtZCA5I2XQDA&s=10",
  },

  {
    id: 6,
    brand: "converse",
    name: "Converse Wave Motion Trainer Leather",
    price: "2,500",
    size: 39,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/Converse Wave Motion Trainer Leather.webp",
  },
  {
    id: 7,
    brand: "converse",
    name: "Chuck Taylor All Star Malden Street Suede",
    price: "2,300",
    size: 39,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/Chuck Taylor All Star Malden Street Suede.webp",
  },
  {
    id: 8,
    brand: "converse",
    name: "Chuck 70 Canvas Wide",
    price: "2,100",
    size: 41,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/Chuck 70 Canvas Wide.webp",
  },
  {
    id: 9,
    brand: "converse",
    name: "Converse x Comme des Garçons PLAY Chuck 70.1",
    price: "3,000",
    size: 40,
    condition: 95,
    badgeColor: "bg-success",
    image: "/images/Converse x Comme des Garçons PLAY Chuck 70.1.webp",
  },
  {
    id: 10,
    brand: "converse",
    name: "Converse x Comme des Garçons PLAY Chuck 70",
    price: "2,700",
    size: 42,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/Converse x Comme des Garçons PLAY Chuck 70.webp",
  },
  {
    id: 11,
    brand: "converse",
    name: "Converse x Comme des Garçons PLAY Chuck 70",
    price: "2,700",
    size: 42,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/Converse x Comme des Garçons PLAY Chuck 70.webp",
  },
  {
    id: 12,
    brand: "newbalance",
    name: "New Balance 9060 Sportstyle",
    price: "1,900",
    size: 42,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/New Balance 9060 Sportstyle.webp",
  },
  {
    id: 13,
    brand: "newbalance",
    name: "New Balance 204L Sportstyle",
    price: "2,100",
    size: 40,
    condition: 92,
    badgeColor: "bg-success",
    image: "/images/New Balance 204L Sportstyle.webp",
  },
  {
    id: 14,
    brand: "newbalance",
    name: "New Balance 327 Sportstyle",
    price: "2,100",
    size: 38,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/New Balance 327 Sportstyle.webp",
  },
  {
    id: 15,
    brand: "newbalance",
    name: "New Balance 2010 Lifestyle",
    price: "2,500",
    size: 39,
    condition: 95,
    badgeColor: "bg-success",
    image: "/images/New Balance 2010 Lifestyle.webp",
  },
  {
    id: 16,
    brand: "newbalance",
    name: "New Balance 740",
    price: "1,800",
    size: 40,
    condition: 95,
    badgeColor: "bg-success",
    image: "/images/New Balance 740.webp",
  },
  {
    id: 17,
    brand: "puma",
    name: "PUMA Palermo",
    price: "1,800",
    size: 41,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/Palermo.avif",
  },
  {
    id: 18,
    brand: "puma",
    name: "PUMA Palermo",
    price: "2,000",
    size: 40,
    condition: 95,
    badgeColor: "bg-success",
    image: "/images/Palermo (1).avif",
  },
  {
    id: 19,
    brand: "puma",
    name: "PUMA Palermo",
    price: "2,200",
    size: 40,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/Palermo(3).avif",
  },
  {
    id: 20,
    brand: "puma",
    name: "Speedcat-Ballet",
    price: "2,000",
    size: 40,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/รองเท้าหนังกลับ-Speedcat-Ballet-สำหรับผู้หญิง (3).avif",
  },
  {
    id: 21,
    brand: "puma",
    name: "Speedcat-Ballet",
    price: "2,000",
    size: 39,
    condition: 92,
    badgeColor: "bg-success",
    image: "/images/รองเท้าหนังกลับ-Speedcat-Ballet-สำหรับผู้หญิง (2).avif",
  },
  {
    id: 22,
    brand: "puma",
    name: "Speedcat-Ballet",
    price: "1,900",
    size: 39,
    condition: 85,
    badgeColor: "bg-success",
    image: "/images/รองเท้าหนังกลับ-Speedcat-Ballet-สำหรับผู้หญิง (1).avif",
  },
  {
    id: 23,
    brand: "puma",
    name: "Speedcat-Ballet",
    price: "2,100",
    size: 42,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/รองเท้าหนังกลับ-Speedcat-Ballet-สำหรับผู้หญิง.avif",
  },
  {
    id: 24,
    brand: "puma",
    name: "Speedcat-OG",
    price: "2,100",
    size: 40,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/รองเท้าผ้าใบ-Speedcat-OG-สำหรับทุกเพศ (4).avif",
  },
  {
    id: 25,
    brand: "puma",
    name: "Speedcat-OG",
    price: "2,100",
    size: 41,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/รองเท้าผ้าใบ-Speedcat-OG-สำหรับทุกเพศ (3).avif",
  },
  {
    id: 26,
    brand: "puma",
    name: "Speedcat-OG",
    price: "1,800",
    size: 40,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/รองเท้าผ้าใบ-Speedcat-OG-สำหรับทุกเพศ (2).avif",
  },
  {
    id: 27,
    brand: "puma",
    name: "Speedcat-OG",
    price: "1,900",
    size: 38,
    condition: 85,
    badgeColor: "bg-success",
    image: "/images/รองเท้าผ้าใบ-Speedcat-OG-สำหรับทุกเพศ (1).avif",
  },
  {
    id: 28,
    brand: "puma",
    name: "Speedcat-OG",
    price: "2,100",
    size: 39,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/รองเท้าผ้าใบ-Speedcat-OG-สำหรับทุกเพศ.avif",
  },
];

// รวม router.get("/") ให้เหลือแค่ตัวเดียว
router.get("/", async (req, res) => {
  try {
    // 1. รับค่าแบรนด์จาก URL (เช่น ?brand=nike) ถ้าไม่มีให้เป็น "all"
    const currentBrand = req.query.brand || "all";

    let shoesData;

    // 2. เช็คว่ามีการเลือกแบรนด์มาหรือไม่
    if (currentBrand !== "all") {
      // กรองเอาเฉพาะรองเท้าที่ brand ตรงกับที่กดมา
      shoesData = mockShoes.filter(
        (shoe) => shoe.brand === currentBrand.toLowerCase(),
      );
    } else {
      // ถ้าไม่มีการระบุแบรนด์ ให้แสดงทั้งหมด
      shoesData = mockShoes;
    }

    // 3. ส่งข้อมูลไปที่ views/pages/shop.ejs
    res.render("pages/shop", {
      products: shoesData, // ตั้งชื่อว่า products เพื่อให้ตรงกับตัวแปรที่หน้า EJS วนลูป
      selectedBrand: currentBrand, // ส่ง selectedBrand ไปทำไฮไลท์เมนูด้านบน
      pageData: { title: "Shop - Sneaker2Hand" },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
