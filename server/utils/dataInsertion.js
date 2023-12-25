const mongoose = require('mongoose');

const url = "mongodb+srv://yashloriya0206:Yash0206@cluster0.u6icnjq.mongodb.net/mern_admin?retryWrites=true&w=majority";


const serviceSchema = new mongoose.Schema({
    service: String,
    description: String,
    price: String,
    provider: String
});

const data = [
    {
        "service": "Web Development",
        "description": "Crafting tailor-made websites and web applications.",
        "price": "$1,500 - $7,000",
        "provider": "Thapa Technical Youtube Inc."
    },
    {

        "service": "E-commerce Website Development",
        "description": "Building powerful e-commerce websites for your business.",
        "price": "$2,000 - $8,000",
        "provider": "Thapa Technical Youtubec."
    },
    {
        "service": "Responsive Web Design",
        "description": "Creating visually stunning and responsive websites.",
        "price": "$1,200 - $6,000",
        "provider": "Thapa Technical Youtube."
    },
    {

        "service": "Mobile App Development",
        "description": "Developing innovative and user - friendly mobile applications.",
        "price": "$2,500 - $10,000",
        "provider": "Thapa Technical Youtube."
    },
    {

        "service": "WordPress Website Development",
        "description": "Building dynamic websites using the WordPress platform.",
        "price": "$1,300 - $5,500",
        "provider": "Thapa Technical Youtube"
    },
    {

        "service": "UI/UX Design Services",
        "description": "Crafting intuitive and user - centric UI / UX designs for your projects.",
        "price": "$1,800 - $7,500",
        "provider": "Thapa Technical Youtube."
    }
]

const Service = mongoose.model('services', serviceSchema);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const newServices = data.map(item => new Service(item));

Service.insertMany(newServices)
  .then(result => {
    console.log('Documents Inserted Successfully.');
  })
  .catch(error => {
    console.error('Error inserting documents:', error);
  })
  .finally(() => {
    mongoose.connection.close();
  });