import React from "react";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import HeaderButton from "../components/UI/HeaderButton";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen, {
  screenOptions as orderScreenOptions,
} from "../screens/shop/OrdersScreen";
import UserProductsScreen, {
  screenOptions as adminScreenOptions,
} from "../screens/user/UserProductsScreen";
import EditProductScreen, {
  screenOptions as editScreenOptions,
} from "../screens/user/EditProductScreen";

const defaultNavigation = {
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
};

//Product Navigator
const ProductsNavigator = createStackNavigator();

export const ProductsStackNavigator = () => {
  return (
    <ProductsNavigator.Navigator screenOptions={defaultNavigation}>
      <ProductsNavigator.Screen
        name="ProductsOverview"
        component={ProductOverviewScreen}
        options={(navData) => ({
          headerTitle: "All Product",
          headerTitleAlign: "center",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                  navData.navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
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

//Orders Navigator
const OrdersNavigator = createStackNavigator();
export const OrdersStackNavigator = () => {
  return (
    <OrdersNavigator.Navigator screenOptions={defaultNavigation}>
      <OrdersNavigator.Screen
        options={orderScreenOptions}
        name="Orders"
        component={OrdersScreen}
      />
    </OrdersNavigator.Navigator>
  );
};

//Admin Navigator
const AdminNavigator = createStackNavigator();
export const AdminStackNavigator = () => {
  return (
    <AdminNavigator.Navigator screenOptions={defaultNavigation}>
      <AdminNavigator.Screen
        options={adminScreenOptions}
        name="UserProducts"
        component={UserProductsScreen}
      />
      <AdminNavigator.Screen
        options={editScreenOptions}
        name="EditProduct"
        component={EditProductScreen}
      />
    </AdminNavigator.Navigator>
  );
};

//DrawerNavigator
const ShopNavigators = createDrawerNavigator();
export const ShopDrawerNavigators = () => {
  const dispatch = useDispatch();

  return (
    <ShopNavigators.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
    >
      <ShopNavigators.Screen
        name="Products"
        component={ProductsStackNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopNavigators.Screen
        name="Orders"
        component={OrdersStackNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />

      <ShopNavigators.Screen
        name="Admin"
        component={AdminStackNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </ShopNavigators.Navigator>
  );
};
