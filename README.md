## Online Vending Machine
A simple SSR app that replicates a vending machine. Created with react using next.js as a framework. Express on the server side with MongoDB cluster as store and Mongoose as a wrapper for Mongo commands. 

#### Prerequisite
* rename .env-example file to .env and update the variables with the ones provided in the email
#### Steps for installation
```bash
npm install
npm run build
npm run export
cd out
npx serve -p 8080
```

#### Running in development mode
```bash
npm run dev
```
### Possible features
* some kind of guest user to track balance on server
* analytics for products and guest users. how much money they add, what kind of products are popular. etc
* get change functionality, and break the change into coins 
* separate page to add products or modify them
* etc
