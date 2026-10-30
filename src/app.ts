import express,{type ErrorRequestHandler} from 'express';
import {z} from 'zod';
import {findProduct,listProducts} from './catalog.js';
export const app=express();
app.disable('x-powered-by');
app.use(express.json({limit:'32kb'}));
app.get('/health',(_req,res)=>res.json({status:'ok'}));
app.get('/api/v1/products',(req,res)=>{
 const parsed=z.object({search:z.string().max(80).optional()}).safeParse(req.query);
 if(!parsed.success){res.status(400).json({error:{code:'VALIDATION_ERROR',message:'Invalid search query'}});return;}
 const items=listProducts(parsed.data.search);res.json({data:items,meta:{count:items.length}});
});
app.get('/api/v1/products/:id',(req,res)=>{const item=findProduct(req.params.id);if(!item){res.status(404).json({error:{code:'NOT_FOUND',message:'Product not found'}});return;}res.json({data:item});});
app.use((_req,res)=>res.status(404).json({error:{code:'NOT_FOUND',message:'Route not found'}}));
const errorHandler:ErrorRequestHandler=(err,_req,res,_next)=>{console.error('Request failed',err);res.status(500).json({error:{code:'INTERNAL_ERROR',message:'Unexpected server error'}});};
app.use(errorHandler);
