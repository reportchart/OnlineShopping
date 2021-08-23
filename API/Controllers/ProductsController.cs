using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
     
        private readonly IProductRepository _productRepository;

        public ProductsController(IProductRepository productRepository )
        {
            _productRepository = productRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            string filePath = @"C:\MyDir\MySubDir\myfile.ext";
            string directoryName;
              directoryName = Path.GetDirectoryName(filePath);
           var products= await _productRepository.GetProductsAsync();
           return Ok(products);
        }

       [HttpGet]
       [Route("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
             var product= await  _productRepository.GetProductByIdAsync(id);
             return Ok(product);
        }
   
        [HttpGet("Type")]    
        public async Task<ActionResult<List<ProductType>>> GetProductTypes()
        {      
           var ProductTypes= await _productRepository.GetProductTypesAsync();
           return Ok(ProductTypes);
        }

          [HttpGet("Brand")]
        public async Task<ActionResult<List<ProductBrand>>> GetProductBrands()
        {      
           var ProductTypes= await _productRepository.GetProductTypesAsync();
           return Ok(ProductTypes);
        }



        
    }
}