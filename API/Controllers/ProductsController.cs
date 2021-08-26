using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{


    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<ProductType> _productTypeRepo;
        private readonly IGenericRepository<ProductBrand> _productBrandRepo;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product>  productRepo,
        IGenericRepository<ProductType>  ProductTypeRepo,
         IGenericRepository<ProductBrand>  ProductBrandRepo,
         IMapper mapper )
        {
            _productRepo = productRepo;
            _productTypeRepo = ProductTypeRepo;
            _productBrandRepo = ProductBrandRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts()
        {
            var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            string filePath = @"C:\MyDir\MySubDir\myfile.ext";
            string directoryName;
              directoryName = Path.GetDirectoryName(filePath);
           var spec= new ProductsWithTypesAndBrandsSpecification();
           var products = await _productRepo.ListAsync(spec);
         return Ok(_mapper.Map<IReadOnlyList<Product>,IReadOnlyList<ProductToReturnDto>>(products));

        }

       [HttpGet]
       [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
              var spec= new ProductsWithTypesAndBrandsSpecification(id);
             var product= await  _productRepo.GetEntityWithSpec(spec);
             if (product == null) return NotFound(new ApiResponse(404));
            return _mapper.Map<Product,ProductToReturnDto>(product);
        }
   
        [HttpGet("Type")]    
        public async Task<ActionResult<List<ProductType>>> GetProductTypes()
        {      
           var ProductTypes= await _productTypeRepo.ListAllAsync();
           return Ok(ProductTypes);
        }

        [HttpGet("Brand")]
        public async Task<ActionResult<List<ProductBrand>>> GetProductBrands()
        {      
           var ProductBrands= await _productBrandRepo.ListAllAsync();
           return Ok(ProductBrands);
        }



        
    }
}