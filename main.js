import {getImageForLabel, saveImagelabel} from './Api.js';

var app = new Vue({
    el: '#app',
    // on mount call getImageForLabel
    mounted() {
        this.getImage();
        // get token from url param token and set token
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        console.log(token)
        this.token = token;
    },
    data() {
      return {
        // add object with name and style object with backgroundColor: [hex] for each of the following colors Aua Blue, Black, Brown, Burgundy, Cardinal Red, Charcoal Grey, Colar Red, Denim, Forest Green, Hot Pink, Lemon Yellow, Magenta, Mauve, Metallic, Mint Green, Multi, Naby Blue, Neon Lime, Olive Green,, Rasberry Red, Rose Beige, Royal Blue, Sky Blue, Smokey Grey, Teal, Violey,, White
        // example {name: 'Aqua Blue', style: {backgroundColor: '#00FFFF'}}
        Colors: [
          {name: 'Aqua Blue', style: {backgroundColor: '#00FFFF',color: 'black'}},
          {name: 'Royal Blue', style: {backgroundColor: '#4169E1'}},
          {name: 'Sky Blue', style: {backgroundColor: '#87CEEB'}},
          {name: 'Black', style: {backgroundColor: '#000000'}},
          {name: 'Light Brown', style: {backgroundColor: '#C19A6B', color: 'black'}},
          {name: 'Brown', style: {backgroundColor: '#A52A2A'}},
          {name: 'Burgundy', style: {backgroundColor: '#800020'}},
          {name: 'Cardinal Red', style: {backgroundColor: '#C41E3A'}},
          {name: 'Coral Red', style: {backgroundColor: '#FF2400'}},
          {name: 'Denim', style: {backgroundColor: '#1560BD'}},
          {name: 'Forest Green', style: {backgroundColor: '#014421'}},
          {name: 'Pink', style: {backgroundColor: '#FFC0CB'}},
          {name: 'Hot Pink', style: {backgroundColor: '#FF69B4'}},
          {name: 'Magenta', style: {backgroundColor: '#FF00FF'}},
          {name: 'Yellow', style: {backgroundColor: '#FFFF00', color: 'black'}},
          {name: 'Orange', style: {backgroundColor: '#FFA500'}},
          {name: 'Mauve', style: {backgroundColor: '#E0B0FF', color: 'black'}},
          {name: 'Metallic', style: {backgroundColor: '#D3D3D3', color: 'black'}},
          {name: 'Mint Green', style: {backgroundColor: '#98FF98', color: 'black'}},
          {name: 'Neon Lime', style: {backgroundColor: '#00FF7F'}},
          {name: 'Navy Blue', style: {backgroundColor: '#000080'}},
          {name: 'Olive Green', style: {backgroundColor: '#808000'}},
          {name: 'Rasberry Red', style: {backgroundColor: '#E30B5D'}},
          {name: 'Rose Beige', style: {backgroundColor: '#FFCC99', color: 'black'}},
          {name: 'Smokey Grey', style: {backgroundColor: '#708090'}},
          {name: 'Charcoal Grey', style: {backgroundColor: '#36454F'}},
          {name: 'Teal', style: {backgroundColor: '#008080'}},
          {name: 'Gold', style: {backgroundColor: '#FFD700'}},
          {name: 'Violet', style: {backgroundColor: '#8F00FF'}},
          {name: 'Multi', style: {backgroundColor: '#C54B8C'}},
          {name: 'Animal Print', style: {backgroundColor: 'brown'}},
          {name: 'Camouflage', style: {backgroundColor: '#7B5844'}},
          {name: 'Floral', style: {backgroundColor: 'pink'}},
          {name: 'Stripes', style: {backgroundColor: 'grey'}},
          {name: 'Polka Dots', style: {backgroundColor: 'black'}},
          {name: 'Cream', style: {backgroundColor: '#FFFDD0', color: 'black'}},
          {name: 'White', style: {backgroundColor: 'white', color: 'black'}},
        ],
        imageSrc: '',
        product: {},
        token: '',
        listOfProducts: [],
      };
    },
    methods: {
        // call getImageForLabel and set imageSrc to image._id
        getImage() {
            getImageForLabel().then((product) => {
                // https://inshopthumbs.s3.amazonaws.com/product_images/{}.jpg set imageSrc to image._id
                if(product.mainImage.includes('ssense.com')) {
                    console.log('ssense.com')
                    this.getImage();
                } else {
                    this.listOfProducts.push(product);
                }
                    this.imageSrc = `https://inshopthumbs.s3.amazonaws.com/product_images/${product._id}.jpg`;
                    this.product = product;
                    // push product to listOfProducts
                });
        },
        labelColor(label) {
            console.log(label);
            // call SaveImagelabel with product._id and label
            if(!this.product) return;
            this.product.image_labeled = label;
            const product = this.product;
            
            // push product to listOfProducts
            this.listOfProducts.push(product);
            const getNewImage = this.getImage;
            const token = this.token;
            saveImagelabel({
                product: product, 
                label,
                token,
            }).then((response) => {
                // set imageSrc to image._id
                console.log(response)
                getNewImage();
            });
        },
        previousProduct() {
            // when clicked on previous product button set product to previous product in listOfProducts
            const index = this.listOfProducts.indexOf(this.product);
            if(index != -1) {
                this.product = this.listOfProducts[index - 1];
                this.imageSrc = `https://inshopthumbs.s3.amazonaws.com/product_images/${this.product._id}.jpg`;
            }

        }
    },
  })