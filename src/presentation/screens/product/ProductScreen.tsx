import { MainLayout } from '../../layouts/MainLayout'
import { useQuery } from '@tanstack/react-query'
import { RootStackParams } from '../../navigation/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { getProductById } from '../../../actions/products/get-product-by-id';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { ButtonGroup, Button, Input, Layout, useTheme } from '@ui-kitten/components';
import { FadeInImage } from '../../components/ui/FadeInImage';
import { Gender, Size } from '../../../domain/entities/product';
import { MyIcon } from '../../components/ui/MyIcon';
import { Text } from 'react-native';

const size: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl]
const genders: Gender[] = [Gender.Kid, Gender.Men, Gender.Women, Gender.Unisex]

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'>{}

export const ProductScreen = ({ route }: Props) => {
    const { productId } = route.params;
    const theme = useTheme();

    const { data: product } = useQuery({
      queryKey: ['product', productId],
      queryFn: () => getProductById(productId),
    });


    if( !product ) {
      return <MainLayout title="Cargando..."/>
    }

    return (
      <MainLayout
        title={ product.title} 
        subTitle={ `Precio: ${ product.price}`}
      >
        <ScrollView style={{ flex: 1}}>

          <Layout>
            {/* TODO: Tener en consideracion cuando no hay imagenes */}
            <FlatList
              data={ product.images }
              keyExtractor={ (item) => item }
              horizontal 
              showsHorizontalScrollIndicator={ false }
              renderItem={ ({ item }) => (
                <FadeInImage
                  uri={ item }
                  style={{ width: 300, height: 300, marginHorizontal: 7}}
                />
              )}
            />
          </Layout>
          
          <Layout style={{ marginHorizontal: 10}}>
            <Input
              label="Titulo"
              value={ product.title }
              style={{ marginVertical: 5}}
            />
            <Input
              label="Slug"
              value={ product.slug }
              style={{ marginVertical: 5}}
            />
            <Input
              label="Descripcion"
              value={ product.description }
              multiline
              numberOfLines={5}
              style={{ marginVertical: 5}}
            />
          </Layout>

          <Layout style={{ marginVertical: 5, marginHorizontal: 15, flexDirection: 'row', gap: 10}}>

            <Input
              label="Precio"
              value={ product.price.toString()}
              style={{ flex: 1 }}
            />
            
            <Input
              label="Inventario"
              value={ product.stock.toString()}
              style={{ flex: 1 }}
            />
          </Layout>

          <ButtonGroup 
            style={{ margin: 2, marginTop: 20, marginHorizontal: 15}}
            size="small"
            appearance="outline"
          >
            {
              size.map((size) => (
                <Button
                  key={size}
                  style={{ 
                    flex: 1, 
                    backgroundColor: true ? theme['color-primary-200'] : undefined
                  }}
                >{size}</Button>
              ))
            }
          </ButtonGroup>

          <ButtonGroup 
            style={{ margin: 2, marginTop: 20, marginHorizontal: 15}}
            size="small"
            appearance="outline"
          >
            {
              size.map((gender) => (
                <Button
                  key={gender}
                  style={{ 
                    flex: 1, 
                    backgroundColor: true ? theme['color-primary-200'] : undefined
                  }}
                >{size}</Button>
              ))
            }
          </ButtonGroup>

          <Button
            accessoryLeft={<MyIcon name="save-outine" white />}
            onPress={() => console.log('Guardar')}
            style={{margin: 15}}
          >
            Guardar
          </Button>

          <Text>{ JSON.stringify(product, null, 2) }</Text>

          <Layout style={{height: 200}} />

        </ScrollView>

      </MainLayout>
    )
}