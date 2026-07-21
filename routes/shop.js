const express = require("express");
const router = express.Router();

// 👟 สร้างข้อมูลจำลอง (Mock Data) ของรองเท้าเอาไว้ทดสอบก่อน
const mockShoes = [
  {
    id: 1,
    brand: "nike",
    name: "Nike Air Force 1",
    price: "3,500",
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80",
  },
  {
    id: 2,
    brand: "nike",
    name: "Nike Dunk Low",
    price: "3,200",
    image: "https://i.ebayimg.com/images/g/E6UAAOSwHehntlHs/s-l1600.webp",
  },
  {
    id: 3,
    brand: "adidas",
    name: "Adidas Samba",
    price: "2,700",
    image:
      "https://assets.adidas.com/images/w_500,f_auto,q_auto/3a4ab3dac9c1429389cd77e280f3c8e4_9366/adidas_Originals_x_Liberty_London_Samba_OG_IH9056_01_00_standard.jpg",
  },
  {
    id: 4,
    brand: "jordan",
    name: "Air Jordan 1",
    price: "4,800",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRABgPAMoO5u0Ra8nJDmA6g7ZRzxRI7I-AaGlcuGEqcMm4xbXofcspzwMdz&s=10",
  },
  {
    id: 5,
    brand: "newbalance",
    name: "New Balance 530",
    price: "2,900",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT96QL0YydnLkom1gpJHhHsgomVJgDUqPO3PwU1h6tR3LgNtZCA5I2XQDA&s=10",
  },
];

router.get("/", async (req, res) => {
  try {
    // 1. รับค่าแบรนด์จาก URL (เช่น ?brand=nike)
    const selectedBrand = req.query.brand;

    let shoesData;

    // 2. เช็คว่ามีการเลือกแบรนด์มาหรือไม่
    if (selectedBrand) {
      // ใช้คำสั่ง .filter() เพื่อกรองเอาเฉพาะรองเท้าที่ brand ตรงกับที่กดมา
      shoesData = mockShoes.filter(
        (shoe) => shoe.brand === selectedBrand.toLowerCase(),
      );
    } else {
      // ถ้าไม่มีการระบุแบรนด์ (เข้ามาหน้า shop ตรงๆ) ให้แสดงทั้งหมด
      shoesData = mockShoes;
    }

    // 3. ส่งข้อมูลไปที่ views/pages/shop.ejs
    // 3. ส่งข้อมูลไปที่ views/pages/shop.ejs
    res.render("pages/shop", {
      shoes: shoesData,
      currentBrand: selectedBrand,
      pageData: { title: "Shop - Sneaker2Hand" }, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
