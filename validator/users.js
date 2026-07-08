const Joi = require("joi");
const validation = () => {
  return (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).max(15).required(),
    });
    // ทําการตรวจสอบความถูกต้องของข้อมูล req.body ที่ส่งมา
    const result = schema.validate(req.body);
    if (result.error == undefined) next();
    else {
      // กรณีเกิด error ข้อมูลไม่ผ่านการตรวจสอบ
      res.locals.errors = {
        message: result.error.details[0].message,
      };
      res.locals.user = req.body;
      return res.render(req.renderPage);
    }
  };
};
module.exports = { validation };
