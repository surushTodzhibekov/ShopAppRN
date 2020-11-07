import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Colors from "../constants/Colors";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import HeaderButton from "../components/UI/HeaderButton";
import CartScreen from "../screens/shop/CartScreen";

const ProductsNavigator = createStackNavigator();

const ProductsStackNavigator = () => {
  return (
    <ProductsNavigator.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : "",
        },
        headerTitleStyle: {
          fontFamily: "open-sans-bold",
        },
        headerBackTitleStyle: {
          fontFamily: "open-sans",
        },
        headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
      }}
    >
      <ProductsNavigator.Screen
        name="ProductsOverview"
        component={ProductOverviewScreen}
        options={(navData) => ({
          headerTitle: "All Product",
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Cart"
                iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                onPress={() => {
                  navData.navigation.navigate("Cart");
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <ProductsNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={(props) => {
          return {
            headerTitle: props.route.params.productTitle,
          };
        }}
      />
      <ProductsNavigator.Screen name="Cart" component={CartScreen} />
    </ProductsNavigator.Navigator>
  );
};

export default ProductsStackNavigator;
