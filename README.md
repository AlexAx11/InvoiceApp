client side

run:

1. start server side (provided separately)

remove package.json

npm init

npm install express sequelize

npm i sqlite3

npm install cors --save

7 row: cors = require('cors');

147 row: app.use(cors());

295-330 row: remove

change all findById to findByPk

npm start

2. download dependencies

npm init

3. start client side

npm run serve

4. optional. create bundle

npm run dev
