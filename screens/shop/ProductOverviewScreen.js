import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";

function ProductOverviewScreen(props) {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {
            props.navigation.navigate("ProductDetail", {
              productId: itemData.item.id,
              productTitle: itemData.item.title,
            });
          }}
          onAddToCart={() => dispatch(cartActions.addToCart(itemData.item))}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ProductOverviewScreen;
