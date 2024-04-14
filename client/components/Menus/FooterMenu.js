import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const FooterMenu = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text>Post</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text>About</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
 display:'flex',
 alignItems:'flex-end',
    flexDirection: "row",
    margin:10 ,
    justifyContent: 'space-between',
    fontWeight:'bold',
    fontSize:15
    
  },
});

export default FooterMenu;
