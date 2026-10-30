export type Product=Readonly<{id:string;name:string;price:number;currency:'EUR'}>;
const products:Product[]=[{id:'p-101',name:'Wireless headphones',price:79.9,currency:'EUR'},{id:'p-102',name:'Mechanical keyboard',price:119,currency:'EUR'},{id:'p-103',name:'USB-C dock',price:64.5,currency:'EUR'}];
export function listProducts(query=''):Product[]{return products.filter(product=>product.name.toLowerCase().includes(query.toLowerCase()));}
export function findProduct(id:string):Product|undefined{return products.find(product=>product.id===id);}
