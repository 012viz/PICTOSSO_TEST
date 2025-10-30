import { GelatoOrder, GelatoOrderData, ShippmentQuoteResponse, TGelatoProduct, TGetShippingMethodInput } from '@/types';
import axios from 'axios';

export interface GelatoVariant {
  templateVariantId: string;
  imagePlaceholders: { name: string; fileUrl: string }[];
}

export interface GelatoProductData {
  templateId: string;
  title: string;
  description: string;
  isVisibleInTheOnlineStore: boolean;
  salesChannels: string[];
  variants: GelatoVariant[];
}

export const GELATO_STORE_ID = "c9fc671f-b96c-4c07-8fc5-107a34c3a066"

export const createGelatoProductFromTemplate = async (productData: GelatoProductData): Promise<any> => {
  const url = `https://ecommerce.gelatoapis.com/v1/stores/${GELATO_STORE_ID}/products:create-from-template`;
  const headers = {
    'X-API-KEY': process.env.GELATO_API_KEY,
    'Content-Type': 'application/json'
  };

  try {
    const response = await axios.post(url, productData, { headers });
    return response.data;
  } catch (error) {
    console.error('Error creating product from template:', error);
    throw error;
  }
}

export const createGelatoOrder = async (orderData: GelatoOrderData): Promise<any> => {
  const headers = {
    'X-API-KEY': process.env.GELATO_API_KEY,
    'Content-Type': 'application/json'
  };

  

  try {
    const response = await axios.post('https://order.gelatoapis.com/v4/orders', orderData, { headers });

    return response.data;
  } catch (error) {
    // @ts-ignore
    console.error('Error creating Gelato order:', error.response.data);
    throw error;
  }
};

export const patchGelatoDraftOrder = async (gelatoOrderId: string): Promise<any> => {
  const headers = {
    'X-API-KEY': process.env.GELATO_API_KEY,
    'Content-Type': 'application/json'
  };

  try {
    const response = await axios.patch(`https://order.gelatoapis.com/v4/orders/${gelatoOrderId}`, { orderType: "order" }, { headers });

    return response.data;
  } catch (error) {
    // @ts-ignore
    console.error('Error patching Gelato order from draft:', error);
    throw error;
  }
};



export const getGelatoOrder = async (gelatoOrderId: string): Promise<GelatoOrder> => {
  const headers = {
    'X-API-KEY': process.env.GELATO_API_KEY,
    'Content-Type': 'application/json'
  };

  try {
    const response = await axios.get(`https://order.gelatoapis.com/v4/orders/${gelatoOrderId}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error creating Gelato order:', error);
    throw error;
  }
};

export const getGelatoProduct = async (productId: string): Promise<TGelatoProduct> => {
  const url = `https://ecommerce.gelatoapis.com/v1/stores/${GELATO_STORE_ID}/products/${productId}`;
  console.log("FETCHING PRODUCT", url)
  const headers = {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.GELATO_API_KEY
  };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

export const getGelatoShippingMethods = async (orderInfo: TGetShippingMethodInput): Promise<ShippmentQuoteResponse | null> => {

  // const product = await prisma.product.findUnique({ where: { id: body.productId } });
  // if (!product) return null

  // const image = await prisma.generatedImage.findUnique({ where: { id: body.imageId } });
  // if (!image) return null
  const data = {
    orderReferenceId: `order-from-${orderInfo.email}`,
    customerReferenceId: `${orderInfo.firstName} ${orderInfo.lastName}`,
    currency: orderInfo.currency.toUpperCase(),
    allowMultipleQuotes: false,
    recipient: {
      country: orderInfo.country,
      // companyName: orderInfo.companyName,
      firstName: orderInfo.firstName,
      lastName: orderInfo.lastName,
      addressLine1: orderInfo.addressLine1,
      addressLine2: orderInfo.addressLine2,
      state: orderInfo.state,
      city: orderInfo.city,
      postCode: orderInfo.postCode,
      email: orderInfo.email,
      phone: orderInfo?.phone
    },
    products: orderInfo.products.map(product => ({
      itemReferenceId: `${product.productUid}-(x${product.quantity})-${product.publicPath}`,
      productUid: product.productUid,
      // TODO: useless for shipment methods?
      files: [
        {
          type: "default",
          url: product.publicPath
        },
      ],
      quantity: product.quantity,
    }))
  };

  const headers = {
    'X-API-KEY': process.env.GELATO_API_KEY,
    'Content-Type': 'application/json'
  };

  try {
    const response = await axios.post('https://order.gelatoapis.com/v4/orders:quote', data, { headers });
    return response.data as ShippmentQuoteResponse;
  } catch (error) {
    // @ts-ignore
    console.error('Error getGelatoShippingMethods:', error.response.data);
    throw error;
  }
}