import { PrismaService } from 'src/prisma/prisma.service';
import { Module, OnModuleInit } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule implements OnModuleInit {
  constructor(private prismaService: PrismaService, private ProductsService: ProductsService) {}

  async onModuleInit() {
    const products = new Array(10).fill(0).map((_, index) => index + 1);

    await this.prismaService.product.deleteMany();

    for(const productIndex of products){
      await this.ProductsService.create({
        name: `Product ${productIndex}`,
        slug: `product-${productIndex}`,
        description: `Description of product ${productIndex}`,
        price: productIndex * 100,
      });
    }
  }
}
