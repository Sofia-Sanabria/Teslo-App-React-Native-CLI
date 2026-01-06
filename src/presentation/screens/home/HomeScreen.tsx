import React from 'react'
import { Text } from '@ui-kitten/components'
import { getProductsByPage } from '../../../actions/products/get-products-by-page';
import { useQuery } from '@tanstack/react-query';
import { MainLayout } from '../../layouts/MainLayout';
import { FullScreenLoading } from '../../components/ui/FullScreenLoading';
import { ProductList } from '../../components/products/ProductList';

export const HomeScreen = () => {

  const { isLoading, data: products = [] } = useQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60,
    queryFn: () => getProductsByPage(0),
  })

  return (
    <MainLayout
      title="TesloShop - products"
      subTitle="Aplicación Administrativa"
    >
      {
        isLoading
          ? (<FullScreenLoading />)
          : <ProductList products={products} />
      }
      
    </MainLayout>
  )
}