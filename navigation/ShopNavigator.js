import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import Colors from "../constants/Colors";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";

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
        options={{
          headerTitle: "All Product",
        }}
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
    </ProductsNavigator.Navigator>
  );
};

export default ProductsStackNavigator;
