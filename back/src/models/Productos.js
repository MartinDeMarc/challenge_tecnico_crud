const mongoose = require('mongoose');


const ProductoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
      },
      tipo: {
        type: String,
        required: true,
        enum: ['burger', 'condimentos', 'aperitivos', 'bebidas']
      },
      precio: {
        type: Number,
        required: true
      },
      image: {
        type: String,
        default: "https://gulagu.es/wp-content/uploads/2020/12/hamburguesa-generica-01-600x600.jpg"
      },
      isPromotion: {
        type: Boolean,
        default: false
      },
      discount: {
        type: Number,
        validate: {
          validator: function(v) {
            return !this.isPromotion || (this.isPromotion && v !== undefined);
          },
          message: 'Discount is required when isPromotion is true'
        }
      },
      status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive']
      },
      ingredientes: {
        type: [String],
        required: true,
        validate: [arrayLimit, '{PATH} must have at least one ingredient']
      },
      dateCreated: {
        type: Date,
        default: Date.now
      },
      dateModified: {
        type: Date
      }
 })

 function arrayLimit(val) {
    return val.length > 0;
  }
  

  ProductoSchema.pre('save', function(next) {
    this.ingredients = [...new Set(this.ingredients)];
    next();
  });



 module.exports = mongoose.model('Producto', ProductoSchema);