module.exports = {
  default: (req,res) => res.render('cars/default'),
  add: (req,res) => res.render('cars/addCar'),
  edit: (req,res) => res.render('cars/editCar')
}
