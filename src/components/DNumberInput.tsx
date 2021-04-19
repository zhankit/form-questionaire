import React from 'react'
import { StyleSheet, TextInput, Text, View } from 'react-native'
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  ContainerStyle: {
    color: 'black',
    // overlayColor: 'black',
    outlineWidth: 1,
    outlineColor:'#3CAEA3',
    overlayColor: 'blue',
    marginHorizontal: '20px',
    marginTop: '10px',
    height: '70px',
  },
  TextStyle:{
    fontWeight: "600"
  },
  TextInputStyle: {
    color: 'black',
    // overlayColor: 'black',
    outlineWidth: 1,
    outlineColor:'#3CAEA3',
    overlayColor: 'blue',
    borderColor: 'black',
    borderWidth: 1,
    marginTop: '3px',
    paddingHorizontal: '10px',
    height: '50px',
    tintColor: 'black'
  },
})

interface DNumberInputProps {
  title: string;
  placeholder: string;
}

const DTextInput = (props: DNumberInputProps) => {
  const { title, ...rest } = props;
  return (
    <View style={styles.ContainerStyle}>
      <Text style={styles.TextStyle}> {props.title} </Text>
      <TextInput 
        {...props}
        // style
        keyboardType='numeric'
        selectionColor={'blue'}
        style={[styles.TextInputStyle]}
        placeholder={props.placeholder} 
        />  
    </View>
        
  )
}

DTextInput.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  secureTextEntry: PropTypes.any
};

export default DTextInput