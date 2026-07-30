const express = require("express");
const router = express.Router();

// ข้อมูลจำลอง (Mock Data)
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
  {
    id: 29,
    brand: "vans",
    name: "Skip to the end of the images gallery",
    price: "2,100",
    size: 39,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/Skip to the end of the images gallery.jpg",
  },
  {
    id: 30,
    brand: "vans",
    name: "VANS PREMIUM SUPER LOWPRO TRAINER - PIG SUEDE BROWN",
    price: "2,200",
    size: 41,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/VANS PREMIUM SUPER LOWPRO TRAINER - PIG SUEDE BROWN.jpg",
  },
  {
    id: 31,
    brand: "vans",
    name: "VANS OLD SKOOL",
    price: "2,100",
    size: 40,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/VANS OLD SKOOL.jpg",
  },
  {
    id: 32,
    brand: "vans",
    name: "VANS CLASSIC SLIP-ON - GREEN WHITE",
    price: "1,900",
    size: 42,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/VANS CLASSIC SLIP-ON - GREEN WHITE.png",
  },
  {
    id: 33,
    brand: "asics",
    name: "GEL-NIMBUS 10.1",
    price: "2,300",
    size: 42,
    condition: 95,
    badgeColor: "bg-success",
    image: "/images/GEL-NIMBUS 10.1.webp",
  },
  {
    id: 34,
    brand: "asics",
    name: "GEL-KAYANO 20",
    price: "2,500",
    size: 42,
    condition: 95,
    badgeColor: "bg-success",
    image: "/images/GEL-KAYANO 20.webp",
  },
  {
    id: 35,
    brand: "asics",
    name: "GEL-1130",
    price: "2,100",
    size: 40,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/GEL-1130.jpg",
  },
  {
    id: 36,
    brand: "asics",
    name: "GEL-NYC",
    price: "2,000",
    size: 38,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/GEL-NYC.webp",
  },
  {
    id: 37,
    brand: "asics",
    name: "GT-2160",
    price: "2,300",
    size: 41,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/GT-2160.webp",
  },
  {
    id: 38,
    brand: "adidas",
    name: "Superstar II",
    price: "3,400",
    size: 41,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/Superstar II.avif",
  },
  {
    id: 39,
    brand: "adidas",
    name: "Stan Smith",
    price: "3,500",
    size: 40,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/Stan Smith.avif",
  },
  {
    id: 40,
    brand: "adidas",
    name: "Samba OG",
    price: "2,500",
    size: 43,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/Samba OG.avif",
  },
  {
    id: 41,
    brand: "adidas",
    name: "ADISTAR CONTROL 5",
    price: "2,400",
    size: 43,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/รองเท้า ADISTAR CONTROL 5.avif",
  },
  {
    id: 42,
    brand: "adidas",
    name: "Adizero EVO SL",
    price: "2,300",
    size: 40,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/รองเท้า Adizero EVO SL.avif",
  },
  {
    id: 43,
    brand: "nike",
    name: "Nike SB Dunk Low Pro",
    price: "2,500",
    size: 38,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/Nike SB Dunk Low Pro.avif",
  },
  {
    id: 44,
    brand: "nike",
    name: "Nike Dunk Low SE",
    price: "3,000",
    size: 39,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/Nike Dunk Low SE.avif",
  },
  {
    id: 45,
    brand: "jordan",
    name: "Jordan 1 Retro Low OG SP Fragment x Travis Scott",
    price: "5,000",
    size: 40,
    condition: 99,
    badgeColor: "bg-success",
    image: "/images/Jordan 1 Retro Low OG SP Fragment x Travis Scott.webp",
  },
  {
    id: 46,
    brand: "jordan",
    name: "Jordan 1 Retro Low OG SP Travis Scott Mocha",
    price: "4,800",
    size: 41,
    condition: 90,
    badgeColor: "bg-success",
    image: "/images/Jordan 1 Retro Low OG SP Travis Scott Mocha.webp",
  },
  {
    id: 46,
    brand: "nike",
    name: "Canvas and Parachute Beige",
    price: "3,000",
    size: 41,
    condition: 90,
    badgeColor: "bg-success",
    image: "images/Canvas and Parachute Beige.avif",
  },
];

// หน้าแสดงรายการสินค้า (Shop)
router.get("/", async (req, res) => {
  try {
    const currentBrand = req.query.brand || "all";
    let shoesData;

    if (currentBrand !== "all") {
      // ค้นหาแบบยืดหยุ่น พิมพ์บางส่วนก็เจอ
      shoesData = mockShoes.filter((shoe) =>
        shoe.brand.toLowerCase().includes(currentBrand.toLowerCase())
      );
    } else {
      shoesData = mockShoes;
    }

    // อย่าลืมเช็กดูว่าโค้ด res.render ของเดิมของคุณหน้าตาแบบนี้ไหม
    // ต้องมีปีกกาปิด } ของ try และ ) ของ router.get ให้ครบแบบด้านล่างนี้ครับ
    res.render("pages/shop", {
      products: shoesData,
      pageData: { title: "Shop - Sneaker2Hand", active: "shop" },
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
}); // ปีกกาปิดของ router.get

// หน้าแสดงรายละเอียดสินค้า (Product Detail)
router.get("/product/:id", (req, res) => {
  try {
    // รับ ID จาก URL และแปลงเป็นตัวเลข
    const productId = parseInt(req.params.id);

    // ค้นหาสินค้าจาก mockShoes
    const product = mockShoes.find((shoe) => shoe.id === productId);

    // ถ้าไม่เจอสินค้า ให้ส่งกลับ 404
    if (!product) {
      return res.status(404).send("Product not found");
    }

    // ส่งข้อมูลไปเรนเดอร์ที่หน้า product.ejs
    res.render("pages/product", {
      product: product,
      pageData: { title: `${product.name} - Sneaker2Hand` },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
